import { CreateProjectTypeDto,ProjectTypeDto,ProjectDto,CreateProjectDto,ProjectFilterDto,PaginatedListOfProjectDto, FileParameter } from '../api-clients/general-client';
import { Result } from '../api-clients/general-client';
import { GeneralClient } from 'app/api-clients/general-client';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private client: GeneralClient) {}

  addProjectType(model: CreateProjectTypeDto): Observable<Result> {
    return this.client.apiProjecttypeCreate(model);
  }

  editProjectType(id: string, model: CreateProjectTypeDto): Observable<Result> {
    return this.client.apiProjecttypeUpdate(id, model);
  }

  deleteProjectType(id: string): Observable<Result> {
    return this.client.apiProjecttypeDelete(id);
  }

  getAllProjectType() : Observable<ProjectTypeDto[]> {
    return this.client.apiProjecttypeGetall();
  }

  getProjectTypeById(id: string) : Observable<ProjectTypeDto> {
    return this.client.apiProjecttypeGetbyid(id);
  }
  

  getAllProject() : Observable<ProjectDto[]>{
    return this.client.apiProjectGetall();
  }
  
  getProjectById(id: string) : Observable<ProjectDto>{
    return this.client.apiProjectGetbyid(id);
  }

  getProjectByFriendlyUrl(friendlyUrl: string) : Observable<ProjectDto>{
    return this.client.apiProjectGetbyfriendlyurl(friendlyUrl);
  }

  getProjectFilter(filter: ProjectFilterDto) : Observable<PaginatedListOfProjectDto>{
    return this.client.apiProjectFilter(filter);
  }

  addProject(model: CreateProjectDto): Observable<Result> {
    return this.client.apiProjectCreate(model);
  }

  updateProject(id: string, model: CreateProjectDto): Observable<Result> {
    return this.client.apiProjectUpdate(id,model);
  }

  deleteProject(id: string): Observable<Result> {
    return this.client.apiProjectDelete(id);
  }
}
