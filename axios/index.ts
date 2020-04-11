export interface AxiosConfig {
  headers?: {
    [key: string]: string;
  }
  withCredentials?: boolean;
}

export interface AxiosData {
  [key: string]: any;
}

export interface AxiosResult {
  data: any;
  status: number;
  statusText: string;
}

function isAxiosData(data: any): data is AxiosData {
  if (data !== null) return false;
  if (data instanceof FormData) return false;
  return typeof data === 'object';
}

export interface Axios {
  defaults: {
    baseUrl: string;
    headers: {
      [key: string]: string;
    }
  }
  get(url: string, config?: AxiosConfig): Promise<AxiosResult>;

  put(url: string, data?: string | AxiosData | FormData, config?: AxiosConfig): Promise<AxiosResult>;

  patch(url: string, data?: string | AxiosData | FormData, config?: AxiosConfig): Promise<AxiosResult>;

  post(url: string, data?: string | AxiosData | FormData, config?: AxiosConfig): Promise<AxiosResult>;

  delete(url: string, config?: AxiosConfig): Promise<AxiosResult>;

  options(url: string, config?: AxiosConfig): Promise<AxiosResult>;

  head(url: string, config?: AxiosConfig): Promise<AxiosResult>;
}

const axios: Axios = {
  defaults: {
    baseUrl: '',
    headers: {},
  },
  get(url, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('GET', axios.defaults.baseUrl + url);
      const headers: { [key: string]: any } = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      xhr.send();
    });
  },
  put(url, data, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('PUT', axios.defaults.baseUrl + url);
      const headers: { [key: string]: any } = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      if (isAxiosData(data)) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  },
  patch(url, data, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('PATCH', axios.defaults.baseUrl + url);
      const headers: { [key: string]: any } = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      if (isAxiosData(data)) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  },
  post(url, data, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('POST', axios.defaults.baseUrl + url);
      const headers: { [key: string]: any } = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      if (isAxiosData(data)) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  },
  delete(url, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('DELETE', axios.defaults.baseUrl + url);
      const headers: { [key: string]: string } = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      xhr.send();
    });
  },
  options(url, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('OPTIONS', axios.defaults.baseUrl + url);
      const headers: { [key: string]: any } = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      xhr.send();
    });
  },
  head(url, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
           reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
        }
      };
      xhr.onerror = function () {
         reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('HEAD', axios.defaults.baseUrl + url);
      const headers: { [key: string]: any } = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      xhr.send();
    });
  },
};

export default axios;
