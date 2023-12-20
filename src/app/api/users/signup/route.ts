import { connect } from "@/db/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/sendEmail";

export async function POST(request: NextRequest) {
  try {
    connect()
    //Get Body Data
    const reqBody = await request.json();
    console.log(reqBody);

    //Check for Duplicate User
    const dbUser = await User.findOne({ email: reqBody.email });

    //Handle Existing User
    if (dbUser) {
      return NextResponse.json({ message: "User Already Exist!!" });
    }

    //Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(reqBody.password, salt);

    //Create New User
    const newUser = new User({
      name: reqBody.name,
      email: reqBody.email,
      password: hashedPass,
      isVerified: reqBody.isVerified,
      role: reqBody.role
    });

    //Saving User
    const saveUser = await newUser.save();

    //
    //send verification email 
    const emailSendResponse = await sendEmail({email: saveUser.email, emailType: "verify", userId: saveUser._id.toString()})
    //Send Response
    return NextResponse.json({ message: "User Created Successfully" });
  } catch (err: any) {
    console.log("signup error");
    console.log(err);
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  return NextResponse.json(
    { success: "Response From API Server" },
    { status: 200 }
  );
}
