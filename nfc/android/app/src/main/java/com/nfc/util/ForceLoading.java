package com.nfc.util;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by tangdi on 1/15/18.
 */

public class ForceLoading implements Parcelable{
    public boolean isUpdate;
    public String version;
    public String updateLog;

    public ForceLoading(){}

    protected ForceLoading(Parcel in) {
        isUpdate = in.readByte() != 0;
        version = in.readString();
        updateLog = in.readString();
    }

    public static final Creator<ForceLoading> CREATOR = new Creator<ForceLoading>() {
        @Override
        public ForceLoading createFromParcel(Parcel in) {
            return new ForceLoading(in);
        }

        @Override
        public ForceLoading[] newArray(int size) {
            return new ForceLoading[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeByte((byte) (isUpdate ? 1 : 0));
        dest.writeString(version);
        dest.writeString(updateLog);
    }
}
