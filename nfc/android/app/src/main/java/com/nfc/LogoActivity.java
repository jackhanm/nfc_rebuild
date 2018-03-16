package com.nfc;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by tangdi on 3/15/18.
 */

public class LogoActivity extends AppCompatActivity {

    private Timer timer = new Timer();

    @Override
    public void onCreate(Bundle saveInstanceBundle){
        super.onCreate(saveInstanceBundle);
        setContentView(R.layout.logo_activity);
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                Intent intent = new Intent(LogoActivity.this, MainActivity.class);
                startActivity(intent);
                overridePendingTransition(R.anim.activity_into, R.anim.activity_out);
                finish();
                overridePendingTransition(R.anim.activity_into, R.anim.activity_out);
            }
        }, 3000);
    }

}
