export interface IGetCityResponse {
  name: string;
  local_names: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
}

export interface IGetCityResponseWithoutLocalNames
  extends Omit<IGetCityResponse, "local_names"> {}
