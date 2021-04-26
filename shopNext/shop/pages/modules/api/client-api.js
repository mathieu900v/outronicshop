const baseUrl = "http://localhost:5001/api";
const defaultUuid = "00000000-0000-0000-0000-000000000000";

async function createDefaultGetRequest(url, data) {
  try {
    let query = new URLSearchParams(data);
    let fullUrl = `${url}?${query}`;
    console.log(`[API] GET: ${fullUrl}`);
    let response = await fetch(fullUrl, {
      method: 'GET',
      headers: { 'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json' },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function createDefaultPostRequest(url, form, asJson) {
    try {
      let fullUrl = `${url}`;
      console.log(`[API] POST: ${fullUrl}`);
      let response = await fetch(fullUrl, {
        body: JSON.stringify(form),
        method: 'POST',
        headers: { 'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json' },
      });

      if(asJson){
          return await response.json();
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  }

/**
 * Get all the products from the api
 * @returns {Response} api response
 */
export async function getBrandsAsync() {
  let data = {};
  return await createDefaultGetRequest(`${baseUrl}/brands`, data);
}


/**
 * Delete all brand by id
 * @param {uuid} id
 * @returns {Response} api response
 */
 export async function deleteBrandByIdAsync(id, asJson) {    
    return await createDefaultPostRequest(`${baseUrl}/brands/delete`, {id}, asJson);
  }
