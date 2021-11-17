package com.example.socialfuntion

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.AlarmClock
import android.provider.AlarmClock.EXTRA_MESSAGE
import android.widget.Button
import android.widget.EditText
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase

data class Post(val title: String? = null, val content: String? = null) {
    // Null default values create a no-argument default constructor, which is needed
    // for deserialization from a DataSnapshot.
}

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val database = Firebase.database.reference
        val title = findViewById<EditText>(R.id.TITLE)
        val content = findViewById<EditText>(R.id.CONTENT)
//        val header = findViewById<TextView>(R.id.textView)
//        database.child("Posts").child("315").child("title").get().addOnSuccessListener {
//            header.text = it.value as String
//        }

        var button = findViewById<Button>(R.id.button7)
        button.setOnClickListener {
            val title_input = title.text.toString()
            val content_input = content.text.toString()
            val user = Post(title_input, content_input)
            val rnds = (0..10000).random().toString()
            database.child("Posts").child(rnds).setValue(user)
            val intent = Intent(this, Ranking::class.java).apply {
                    putExtra(EXTRA_MESSAGE, title_input)
            }
                startActivity(intent)
            }
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

//            val myRef = database.getReference("message")
//
//            myRef.setValue("Hello, World!")
        }

}

        // get reference to button
//        val btn_click_me = findViewById(R.id.POST) as Button
// set on-click listener
//        btn_click_me.setOnClickListener {
//
//        }
//
//    }
//}
//import android.os.Bundle
//import android.view.MenuItem
//import androidx.appcompat.app.AppCompatActivity
//
//class MainActivity : AppCompatActivity() {
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//
//        // calling the action bar
//        var actionBar = getSupportActionBar()
//
//        // showing the back button in action bar
//        if (actionBar != null) {
//            actionBar.setDisplayHomeAsUpEnabled(true)
//        }
//    }
//
//    // this event will enable the back
//    // function to the button on press
//    override fun onContextItemSelected(item: MenuItem): Boolean {
//        when (item.itemId) {
//            android.R.id.home -> {
//                finish()
//                return true
//            }
//        }
//        return super.onContextItemSelected(item)
//    }
//}