package hk.hkucs.stepcount

import android.content.ContentValues.TAG
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.github.mikephil.charting.data.BarData
import com.github.mikephil.charting.data.BarDataSet
import com.github.mikephil.charting.data.BarEntry
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter
import com.github.mikephil.charting.utils.ColorTemplate
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import kotlinx.android.synthetic.main.barchart.*
import java.io.File
import java.time.LocalDate
import java.time.DayOfWeek
import java.util.*
import kotlin.collections.ArrayList

class BarChart : AppCompatActivity() {

    private val ref = FirebaseDatabase.getInstance().getReference("StepCounter")
    private val currentDate = LocalDate.now()
    var entries: ArrayList<BarEntry> = ArrayList()
    var x: String = "0"
    private fun fetchData(id: String, pos: Float) {

        ref.child(id).get().addOnSuccessListener {
            if (it.exists()) {
                entries.add(BarEntry(pos, it.child("steps").value.toString().toFloat()))

            } else {
                entries.add(BarEntry(pos, 0f))
            }

        }




    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.barchart)

        val user1:String = "USER1"
        var E: ArrayList<String> = ArrayList()
        for (i in 0 .. 6){
            E.add("${currentDate.minusDays(i.toLong())}_${user1}")
        }
        for (i in 6 downTo 0){
            fetchData("${currentDate.minusDays(0.toLong())}_${user1}", (6-i).toFloat())
        }

        entries.add(BarEntry(0f, 10000f))
        entries.add(BarEntry(1f, 12000f))
        entries.add(BarEntry(2f, 8000f))
        entries.add(BarEntry(3f, 9000f))
        entries.add(BarEntry(4f, 15000f))
        entries.add(BarEntry(5f, 8000f))
        entries.add(BarEntry(6f, 2000f))

        fun weekday(n: Long): String {
            return ((LocalDate.now().dayOfWeek) - n).toString().substring(0, 3)
        }
        val xAxisLabels = listOf(weekday(6), weekday(5), weekday(4), weekday(3), weekday(2), weekday(1), weekday(0))
        barChart.xAxis.valueFormatter = IndexAxisValueFormatter(xAxisLabels)

        val barDataSet = BarDataSet(entries, null)
        barDataSet.setColors(*ColorTemplate.COLORFUL_COLORS)

        val data = BarData(barDataSet)
        barChart.data = data

        barChart.axisLeft.setDrawGridLines(false)
        barChart.xAxis.setDrawGridLines(false)
        barChart.xAxis.setDrawAxisLine(false)

        barChart.axisRight.isEnabled = false
        barChart.legend.isEnabled = false

        barChart.description.isEnabled = false

        barChart.invalidate()


    }



}