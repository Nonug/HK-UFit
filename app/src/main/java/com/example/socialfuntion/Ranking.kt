package com.example.socialfuntion

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.AlarmClock
import android.util.Log
import android.view.ContextThemeWrapper
import android.view.Gravity
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.widget.AppCompatButton
import java.text.SimpleDateFormat
import java.util.*
import com.google.firebase.database.DatabaseError

import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.FirebaseDatabase

import com.google.firebase.database.ValueEventListener
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase

internal class GetRank {
    public val Calories: Int? = null
    public val Distance: String? = null
    public val User: String? = null
}

class Ranking : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ranking)
        val ll_table = findViewById<TableLayout>(R.id.TABLE)
//        val database = Firebase.database.reference
        FirebaseDatabase.getInstance().reference.child("Rank").orderByChild("Calories").limitToLast(10)
            .addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(dataSnapshot: DataSnapshot) {
                    for (snapshot in dataSnapshot.children.reversed()) {
                        val user: GetRank? = snapshot.getValue(GetRank::class.java)
//                        System.out.println(user.email)
                        // setting layout_width and layout_height using layout parameters
                        val row = TableRow(this@Ranking)
                        val name = TextView(this@Ranking)
                        val dis = TextView(this@Ranking)
                        val cal = TextView(this@Ranking)

                        name.gravity = Gravity.CENTER
                        dis.gravity = Gravity.CENTER
                        cal.gravity = Gravity.CENTER


//                        row.layoutParams = TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT)
//                        name.layoutParams = TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT)
//                        dis.layoutParams = TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT)
//                        cal.layoutParams = TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT)



                        if (user != null) {
                            name.text = user.User
                        }
                        if (user != null) {
                            dis.text = user.Distance
                        }
                        if (user != null) {
                            cal.text = user.Calories.toString()
                        }

                        row.addView(name)
                        row.addView(dis)
                        row.addView(cal)
                        // add Button to LinearLayout
                        ll_table.addView(row)

                    }
                }
                override fun onCancelled(databaseError: DatabaseError) {}
            })

        var buttonPost = findViewById<Button>(R.id.GoPost)
        buttonPost.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java).apply {
                putExtra(AlarmClock.EXTRA_MESSAGE, "Redirecting")
            }
            startActivity(intent)
        }
        var buttonView = findViewById<Button>(R.id.GoView)
        buttonView.setOnClickListener {
            val intent = Intent(this, Posts::class.java).apply {
                putExtra(AlarmClock.EXTRA_MESSAGE, "Redirecting")
            }
            startActivity(intent)
        }
        var buttonRank = findViewById<Button>(R.id.GoRank)
        buttonRank.setOnClickListener {
            val intent = Intent(this, Ranking::class.java).apply {
                putExtra(AlarmClock.EXTRA_MESSAGE, "Redirecting")
            }
            startActivity(intent)
        }
        }
    }