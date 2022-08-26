import { jsonEndpoint } from '../DockerAPI.js'
import { definitions } from '../specs/v1.41.js'
import { GetParamType } from '../utils/GetParamType.js'
import { GetResponseType } from '../utils/GetResponseType.js'
import { AbstractEndpoint } from './AbstractEndpoint.js'

export type IConfig = definitions['Config']
type Version = definitions['ObjectVersion']
type Spec = definitions['ConfigSpec']

export class Config extends AbstractEndpoint<IConfig> {
  ID!: string
  Version!: Version
  CreatedAt!: string
  UpdatedAt!: string
  Spec!: Spec

  /**
   * List configs
   * @link https://docs.docker.com/engine/api/v1.41/#tag/Config/operation/ConfigList
   */
  static list(query?: GetParamType<'ConfigList'>['query']) {
    return jsonEndpoint<GetResponseType<'ConfigList', 200>>('get', 'configs', {
      searchParams: query
    })
  }

  /**
   * Create a config
   * @link https://docs.docker.com/engine/api/v1.41/#tag/Config/operation/ConfigCreate
   */
  static create(body: GetParamType<'ConfigCreate'>['body']['body']) {
    return jsonEndpoint<GetResponseType<'ConfigCreate', 201>>(
      'post',
      'configs/create',
      {
        json: body
      }
    )
  }

  /**
   * Inspect a config
   * @link https://docs.docker.com/engine/api/v1.41/#tag/Config/operation/ConfigInspect
   */
  static inspect(path: GetParamType<'ConfigInspect'>['path']) {
    return jsonEndpoint<GetResponseType<'ConfigInspect', 200>>(
      'get',
      `configs/${path}`
    )
  }

  /**
   * Inspect a config
   * @link https://docs.docker.com/engine/api/v1.41/#tag/Config/operation/ConfigInspect
   */
  inspect() {
    return Config.inspect({ id: this.ID })
  }

  /**
   * Delete a config
   * @link https://docs.docker.com/engine/api/v1.41/#tag/Config/operation/ConfigDelete
   */
  static delete(path: GetParamType<'ConfigDelete'>['path']) {
    return jsonEndpoint<GetResponseType<'ConfigDelete', 204>>(
      'delete',
      `configs/${path}`
    )
  }

  /**
   * Delete a config
   * @link https://docs.docker.com/engine/api/v1.41/#tag/Config/operation/ConfigDelete
   */
  delete() {
    return Config.delete({ id: this.ID })
  }

  /**
   * Update a config
   * @link https://docs.docker.com/engine/api/v1.41/#tag/Config/operation/ConfigUpdate
   */
  static update(
    path: GetParamType<'ConfigUpdate'>['path'],
    query: GetParamType<'ConfigUpdate'>['query'],
    body: GetParamType<'ConfigUpdate'>['body']['body']
  ) {
    return jsonEndpoint<GetResponseType<'ConfigUpdate', 200>>(
      'post',
      `configs/${path}/update`,
      {
        searchParams: query,
        json: body
      }
    )
  }

  /**
   * Update a config
   * @link https://docs.docker.com/engine/api/v1.41/#tag/Config/operation/ConfigUpdate
   */
  update(
    query: GetParamType<'ConfigUpdate'>['query'],
    body: GetParamType<'ConfigUpdate'>['body']['body']
  ) {
    return Config.update({ id: this.ID }, query, body)
  }
}
