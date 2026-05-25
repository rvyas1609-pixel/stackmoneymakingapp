// This is a backend API route - it runs on the server, not the browser
// The server has permission to bypass RLS restrictions
// Your frontend calls this route, and it adds data safely

import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// POST = when you want to CREATE/ADD something
export async function POST(request: NextRequest) {
  try {
    // Get the user data from the request
    const { name, age } = await request.json()

    // Add the user to Supabase (server-side, so no RLS blocking)
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, age }])
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}

// GET = when you want to READ/FETCH something
export async function GET() {
  try {
    // Get all users from Supabase
    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}

// DELETE = when you want to REMOVE something
export async function DELETE() {
  try {
    // Delete all users
    const { error } = await supabase
      .from('users')
      .delete()
      .neq('id', 0) // Delete all rows

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
