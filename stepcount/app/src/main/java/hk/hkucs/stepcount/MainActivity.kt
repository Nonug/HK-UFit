package hk.hkucs.stepcount

import android.content.Context
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.TextView
import android.widget.Toast
import com.google.firebase.database.*
import kotlinx.android.synthetic.main.activity_main.*
import java.time.LocalDate
import java.util.*


class MainActivity : AppCompatActivity(), SensorEventListener {

    private var sensorManager: SensorManager? = null
    val currentDate = LocalDate.now().toString()
    val user1:String = "USER1"
    val id:String = "${currentDate}_${user1}"

    private var running = false


    private var totalSteps = 0f
    private var previousTotalSteps = 0f

    private val ref = FirebaseDatabase.getInstance().getReference("StepCounter")
    private val record = StepInfo(id, user1, currentDate, 0)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        createData(id)
        setContentView(R.layout.activity_main)

        loadData()
        resetSteps()

        Btn.setOnClickListener {
            val intent = Intent(this, Calendar::class.java)
            startActivity(intent)


        }
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
    }

    override fun onResume() {
        super.onResume()
        running = true


        val stepSensor = sensorManager?.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)

        if (stepSensor == null) {
            Toast.makeText(this, "No sensor detected, please enable step counter", Toast.LENGTH_SHORT).show()
        } else {
            sensorManager?.registerListener(this, stepSensor, SensorManager.SENSOR_DELAY_UI)
        }
    }

    override fun onSensorChanged(event: SensorEvent?) {

        var tv_stepsTaken = findViewById<TextView>(R.id.tv_stepsTaken)

        if (running) {
            totalSteps = event!!.values[0]

            val currentSteps = totalSteps.toInt() - previousTotalSteps.toInt()

            tv_stepsTaken.text = ("$currentSteps")
        }
    }

    fun resetSteps() {
        tv_stepsTaken.setOnClickListener {
            Toast.makeText(this, "Long tap to reset steps", Toast.LENGTH_SHORT).show()
        }

        tv_stepsTaken.setOnLongClickListener {

            previousTotalSteps = totalSteps

            // When the user will click long tap on the screen,
            // the steps will be reset to 0
            tv_stepsTaken.text = 0.toString()

            // This will save the data
            saveData()

            true
        }
    }

    private fun saveData() {

        // Shared Preferences will allow us to save
        // and retrieve data in the form of key,value pair.
        // In this function we will save data
        val sharedPreferences = getSharedPreferences("myPrefs", Context.MODE_PRIVATE)

        val editor = sharedPreferences.edit()
        editor.putFloat("key1", previousTotalSteps)
        editor.apply()
    }

    private fun loadData() {

        val sharedPreferences = getSharedPreferences("myPrefs", Context.MODE_PRIVATE)
        val savedNumber = sharedPreferences.getFloat("key1", 0f)

        Log.d("MainActivity", "$savedNumber")

        previousTotalSteps = savedNumber
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
    }

    private fun createData(id: String) {
        ref.child(id).get().addOnSuccessListener {
            if (!it.exists()){
                ref.child(id).setValue(record)
            }
        }
    }
}
