const baseUrl = "http://localhost:5001/api";
const defaultUuid = "00000000-0000-0000-0000-000000000000";


const ApiClient = {
  createDefaultGetRequest: async (url, data) => {
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
  },
  createDefaultPostRequest: async (url, form, asJson) => {
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
  },

  /************************************************************
 * 
 *                          BRANDS
 * 
 ************************************************************/
  /**
   * Get all the products from the api
   * @returns {Response} api response
   */
  getBrandsAsync: async () => {
  let data = {};
  return await ApiClient.createDefaultGetRequest(`${baseUrl}/brands`, data);
  },
  /**
   * Delete all brand by id
   * @param {uuid} id
   * @returns {Response} api response
   */
  deleteBrandByIdAsync: async (id, asJson) => {    
    return await ApiClient.createDefaultPostRequest(`${baseUrl}/brands/delete`, {id}, asJson);
  },
  /**
   * Count all the brands
   * @returns {Response} api response
   */
  countBrandsAsync: async () => {
    let data = {};
    return await ApiClient.createDefaultGetRequest(`${baseUrl}/brands/count`, data, true);
  },

  /**
   * Create a new brand
   * @returns {Response} api response
   */
  createBrandAsync: async (form) => {
    return await ApiClient.createDefaultPostRequest(`${baseUrl}/brands/create`, form);
  },

  /************************************************************
   * 
   *                        CATEGORIES
   * 
   ************************************************************/
  /**
   * Get all the categories from the api
   * @returns {Response} api response
   */
   getCategoriesAsync: async () => {
    let data = {};
    return await ApiClient.createDefaultGetRequest(`${baseUrl}/categories`, data);
    },
      /**
   * Delete category by id
   * @param {uuid} id
   * @returns {Response} api response
   */
  deleteCategoryByIdAsync: async (id, asJson) => {    
    return await ApiClient.createDefaultPostRequest(`${baseUrl}/categories/delete`, {id}, asJson);
  },
  /**
   * Count all the categories
   * @returns {Response} api response
   */
  countCategoriesAsync: async () =>  {
    let data = {};
    return await ApiClient.createDefaultGetRequest(`${baseUrl}/categories/count`, data, true);
  },
    /**
   * Create a new category
   * @returns {Response} api response
   */
     createCategoryAsync: async (form) => {
      return await ApiClient.createDefaultPostRequest(`${baseUrl}/categories/create`, form);
    },
  /************************************************************
   * 
   *                         PRODUCTS
   * 
   ************************************************************/
  /**
   * Count all the products
   * @returns {Response} api response
   */
  countProductsAsync: async () => {
    let data = {};
    return await ApiClient.createDefaultGetRequest(`${baseUrl}/products/count`, data, true);
  },
}

export default ApiClient;