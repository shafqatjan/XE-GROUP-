<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Http\Requests\EmployeeRequest;
use Illuminate\Http\Response;

class EmployeeController extends Controller
{
    public function index(EmployeeRequest $request)
    {
        $perPage = $request->query('perPage', 10); 
        $employees = Employee::paginate($perPage);
        return response()->json($employees, Response::HTTP_OK);
    }

    public function store(EmployeeRequest $request)
    {
        $employee = Employee::create($request->all());
        return response()->json($employee, Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $employee = Employee::findOrFail($id);
        return response()->json($employee, Response::HTTP_OK);
    }

    public function update(EmployeeRequest $request, $id)
    {
        $employee = Employee::findOrFail($id);
        $employee->update($request->all());
        return response()->json($employee, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
