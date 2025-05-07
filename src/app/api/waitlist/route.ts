import prisma from '@/lib/prisma'
import { isValidEmail } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function POST(req: NextRequest) {
  let _email = 'unknown email'
  try {
    const { email } = await req.json()
    _email = email
    const email_address = email.toLowerCase()
    if (!isValidEmail(email_address))
      return NextResponse.json(
        {
          error: `The provided email address: ${email}, appears to be non-valid! Please check the email address and try again.`,
        },
        { status: 403, headers: corsHeaders },
      )
    const emailExistsInWaitlist = await prisma.waitlist.findUnique({ where: { email: email_address } })
    if (emailExistsInWaitlist)
      return NextResponse.json(
        { error: `${email} already exists on the KooPaa waitlist` },
        { status: 400, headers: corsHeaders },
      )
    await prisma.waitlist.create({ data: { email: email_address } })
    return NextResponse.json(
      {
        data: `${email} has been successfully added to the waitlist! Please keep an eye out for our beta phase launch`,
      },
      { status: 200, headers: corsHeaders },
    )
  } catch (error) {
    console.error(`Error in Waitlist [POST] handler`, error)
    return NextResponse.json(
      { error: `An unknown error occured while trying to add ${_email} to the KooPaa waitlist` },
      { status: 500, headers: corsHeaders },
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    },
  )
}
