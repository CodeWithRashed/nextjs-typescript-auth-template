import { connect } from "@/db/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

export async function POST(request: NextRequest) {
  connect();

  try {
    //Getting Data from body
    const reqBody = await request.json();

    //get existing user
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist!!" });
    }

    //Check Valid Password
    const validPassword = await bcryptjs.compare(
      reqBody.password,
      user.password
    );
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Login Credentials!!" });
    }

    //JWT Token Data
    const tokenData = {
      id: user._id,
    };

    //Create JWT Token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    //Set JWT Token
    const response = NextResponse.json({
        message: "Login Successful.. ",
        status: 200
    })
    response.cookies.set("token", token, {
        httpOnly: true
    })
    return response

    //handing error
  } catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 500} )
  }
}
