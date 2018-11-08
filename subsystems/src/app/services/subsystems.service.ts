

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Subsystems} from './subsystems';
import {XhrBase} from './xhr-base';

@Injectable()
export class SubsystemsService extends XhrBase<Subsystems> {
  private url: string = '/ZLUX/plugins/com.rs.zossystem.subsystems/services'
      + '/data/_current/zosDiscovery/naive/subsystems';

  constructor(public http: Http) {
    super(http);
  }

  getAll(): Observable<Subsystems> {
    let result = this.http
      .get(this.url, XhrBase.getHeaders())
//    .map((response: Response) => response.json().SUBSYSTEMS as Subsystems)
      .map((response: Response) => this.hackFilter(response.json().SUBSYSTEMS as Subsystems))
      .catch(XhrBase.handleError);

    return result as Observable<Subsystems>;
  }

  /**
   * TODO HACK
   */
  private hackFilter(subsystems: Subsystems): Subsystems {
    console.log('TODO: subsystems.service.ts dupe filtering');

    Object.keys(subsystems).forEach((sub: string) => {
      let rows = subsystems[sub];

      for (let ia = 1; ia < rows.length; ++ia) {
        if (rows[ia-1].name === rows[ia].name) {
          rows.splice(--ia, 1);
        }
      }
    });

    return subsystems;
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

