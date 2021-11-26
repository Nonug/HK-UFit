package hk.hkucs.stepcount

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.widget.CalendarView
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.calendar.*
import java.time.LocalDate

class Calendar : AppCompatActivity() {
    private val ref = FirebaseDatabase.getInstance().getReference("StepCounter")
    val user1:String = "USER1"
    fun fetchData(id: String) {
        ref.child(id).get().addOnSuccessListener {
            if (it.exists()){
                stepCountView.text = it.child("steps").value.toString()
            } else {
                stepCountView.text = "0"
            }
        }
    }


    @RequiresApi(Build.VERSION_CODES.O)
    val currentDate = LocalDate.now().toString()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.calendar)
        fetchData("${currentDate}_${user1}")
        chartBtn.setOnClickListener {
            val intent = Intent(this, BarChart::class.java)
            startActivity(intent)
        }

        calendar_view.setOnDateChangeListener(object : CalendarView.OnDateChangeListener {

            override fun onSelectedDayChange(p0: CalendarView, p1: Int, p2: Int, p3: Int) {
                fetchData("$p1-${p2 + 1}-${p3}_${user1}")
            }
        })
    }
}