import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberManagementService {
  API_URL_ADDRESS: string = 'http://localhost:8080/api/address';
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

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.API_URL_USER);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.API_URL_USER + '/' + id);
  }

  editUser(user: User, id: number): Observable<User> {
    return this.httpClient.put<User>(this.API_URL_USER + '/edit/' + id, user);
  }

  deleteUser(id: number , user :User): Observable<any> {
    return this.httpClient.put<any>(this.API_URL_USER + '/delete/' + id,user);
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

  searchUserBySomething(keySearch: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_USER + '/search?q=' + keySearch);
  }
}
