import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get('http://elfagr.ajathy.com/api/departments')
  }

  createDepartments(createBody: {name, status}) {
    return this.http.post('http://elfagr.ajathy.com/api/departments/store', createBody);
  }

  EditDepartmentName(updatedDepartmentName, departmentId) {
    return this.http.put(`http://elfagr.ajathy.com/api/departments/update/${departmentId}`, updatedDepartmentName)
  }

  deletDepartment(departmentId) {
    return this.http.delete(`http://elfagr.ajathy.com/api/departments/delete/${departmentId}`)
  } 

  getAllJobs() {
    return this.http.get('http://elfagr.ajathy.com/api/jobs');
  }

  createNewJob(JobBody){
    return this.http.post('http://elfagr.ajathy.com/api/jobs/store', JobBody)
  }

  editJobName(jobId, updatedJobName) {
    return this.http.put(`http://elfagr.ajathy.com/api/jobs/update/${jobId}`, updatedJobName);
  }

  deleteJob(jobId) {
    return this.http.delete(`http://elfagr.ajathy.com/api/jobs/delete/${jobId}`);
  }
}
