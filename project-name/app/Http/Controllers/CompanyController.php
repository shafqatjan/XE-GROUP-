<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Http\Requests\CompanyRequest;
use App\Notifications\NewCompanyNotification;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    public function index(CompanyRequest $request)
    {
        $perPage = $request->query('perPage', 10);
        $companies = Company::paginate($perPage);
        return response()->json($companies, Response::HTTP_OK);
    }

    public function store(CompanyRequest $request)
    {
        $data = $request->all();

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('public/logos');
            $data['logo'] = $logoPath;
        }

        $company = Company::create($data);
        $company->notify(new NewCompanyNotification());

        return response()->json($company, Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $company = Company::findOrFail($id);
        return response()->json($company, Response::HTTP_OK);
    }

    public function update(CompanyRequest $request, $id)
    {
        $company = Company::findOrFail($id);

        $data = $request->all();

        if ($request->hasFile('logo')) {
            // Delete the previous logo if it exists
            if ($company->logo) {
                Storage::delete($company->logo);
            }

            $logoPath = $request->file('logo')->store('public/logos');
            $data['logo'] = $logoPath;
        }

        $company->update($data);

        return response()->json($company, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $company = Company::findOrFail($id);

        // Delete the company's logo from storage
        if ($company->logo) {
            Storage::delete($company->logo);
        }

        $company->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
