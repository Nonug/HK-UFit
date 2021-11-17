package com.example.socialfuntion

import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.AlarmClock
import android.view.ContextThemeWrapper
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.PopupWindow
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.widget.AppCompatButton
import com.google.firebase.database.DatabaseError

import com.google.firebase.database.DataSnapshot

import com.google.firebase.database.ValueEventListener

import com.google.firebase.database.FirebaseDatabase




internal class GetPost {
    public val title: String? = null
    public val content: String? = null
}

class Posts : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_post)
        val ll_main = findViewById(R.id.LINEAR) as LinearLayout

//        for (i in 1..10)
//        {
//            val button_dynamic = AppCompatButton(this)
//        button_dynamic.text = i.toString()
//        ll_main.addView(button_dynamic)}
        FirebaseDatabase.getInstance().reference.child("Posts")
            .addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(dataSnapshot: DataSnapshot) {
                    for (snapshot in dataSnapshot.children) {
                        val user: GetPost? = snapshot.getValue(GetPost::class.java)
//                        System.out.println(user.email)
                        // setting layout_width and layout_height using layout parameters
                        val button_dynamic = AppCompatButton(this@Posts)
                        button_dynamic.layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
                        if (user != null) {
                            button_dynamic.text = user.title
                        }
                        button_dynamic.setOnClickListener{
                            val builder = AlertDialog.Builder(ContextThemeWrapper(this@Posts, android.R.style.Holo_SegmentedButton))

                            with(builder)
                            {
                                if (user != null) {
                                    setTitle(user.title)
                                }
                                if (user != null) {
                                    setMessage(user.content)
                                }
                                show()
                            }
                        }
                        // add Button to LinearLayout
                        ll_main.addView(button_dynamic)

                    }
                }
                override fun onCancelled(databaseError: DatabaseError) {}
            })

        // creating the button
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