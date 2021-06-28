
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserEditPreview} from '../../../model/userEditPreview';

@Injectable({
  providedIn: 'root'
})

export class MemberManagementService {
  API_URL_ADDRESS: string = 'http://localhost:8080/';
  private API_URL_USER = 'http://localhost:8080/employee/listUser';
  httpOptions: any;


  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }

  /**
   * Sang
   */

  getAllUsers(index: number): Observable<any> {
    return this.httpClient.get(this.API_URL_USER + '/?index=' + index);
  }

  getUserById(id: number): Observable<UserEditPreview> {
    return this.httpClient.get<UserEditPreview>(this.API_URL_USER + '/' + id);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.put<any>(this.API_URL_USER + '/delete/' + id, {});
  }


  getAllProvince(): Observable<any> {
    return this.httpClient.get(this.API_URL_ADDRESS + '/provinces');
  }

  getAllDistrictByProvinceId(id: number): Observable<any> {
    return this.httpClient.get(this.API_URL_ADDRESS + '/districts/' + id);
  }

  getAllWardByDistrictId(id: number): Observable<any> {
    return this.httpClient.get(this.API_URL_ADDRESS + '/wards/' + id);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL_USER + '/create', user);
  }

  editUser(user: UserEditPreview): Observable<UserEditPreview> {
    return this.httpClient.put<UserEditPreview>(this.API_URL_USER + '/edit', user);
  }

  searchUserBySomething(keySearch: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_USER + '/search?q=' + keySearch);
  }

  findAllUsers(): Observable<any> {
    return this.httpClient.get(this.API_URL_USER + '/getAll');
  }

  sendEmailApprove(email: string): Observable<any>{
    return this.httpClient.get(this.API_URL_USER + "/email?email=" + email );
  }
}
