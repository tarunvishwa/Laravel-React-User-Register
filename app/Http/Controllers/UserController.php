<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{




    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|max:10',
                'role' => 'required',
                'email' => 'required|email|unique:users,email',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status'=>400,
                    'message'=>'Error registering a new user!'
                ]);
            }



            $data = [
                "name" => $request->get('name'),
                "role" => $request->get('role'),
                "email" => $request->get('email'),
                "password" => ('$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
            ];


            // dd($data);
            User::create($data);

            return response()->json([
                'status'=>200,
                'message'=>'Successfully registered a new user!'
            ]);
        } catch (Exception $th) {
            Log::error($th);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        try {
            $userlist = User::all();
            return response()->json($userlist);
        } catch (Exception $e) {
            Log::error($e);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
