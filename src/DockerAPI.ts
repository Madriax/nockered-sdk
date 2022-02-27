import { CancelableRequest, HTTPAlias, OptionsInit } from 'got'
import InstanceManager from './InstanceManager'
import { System } from './api/System'
import { IDockerApi } from './types/IDockerApi'

export class DockerAPI implements IDockerApi {
  public system = new System()

  constructor(prefixUrl: string) {
    InstanceManager.setInstance(prefixUrl)
  }
}

/**
 * Call JSON endpoint
 * @param method HTTP method
 * @param endpoint HTTP endpoint
 * @param options Optional options
 */
export function jsonEndpoint<R = {}, P = OptionsInit>(
  method: HTTPAlias,
  endpoint: string,
  options?: P
): CancelableRequest<R> {
  return InstanceManager.getInstance()[method](endpoint, options).json<R>()
}

/**
 * Call string endpoint
 * @param method HTTP method
 * @param endpoint HTTP endpoint
 * @param options Optional options
 */
export function stringEndpoint<P = OptionsInit>(
  method: HTTPAlias,
  endpoint: string,
  options?: P
): CancelableRequest<string> {
  return InstanceManager.getInstance()[method](endpoint, options).text()
}

/**
 * Call stream endpoint
 * @param endpoint HTTP endpoint
 * @param options Optional options
 */
export function streamEndpoint<P = OptionsInit>(endpoint: string, options?: P) {
  return InstanceManager.getInstance().stream(endpoint, options)
}
