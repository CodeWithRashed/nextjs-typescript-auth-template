import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/db/dbConfig";

connect()
export async function GET(request: NextRequest) {

    try {
      const verifiedUserData = await  getTokenData(request)
      console.log(verifiedUserData)
      return NextResponse.json({
        message: "token data"
      })
    } catch (error : any) {
        console.log(error)
        return NextResponse.json({
            error: error.message
          })
    }
    
}