const baseUrl = "http://localhost:5001/api";
const defaultUuid = "00000000-0000-0000-0000-000000000000";


const ApiClient = {
  createDefaultGetRequest: async (url, data) => {
    try {
      let query = new URLSearchParams(data);
      let fullUrl;
      if(data === null) {
        fullUrl = `${url}`;
      }
      else {
        fullUrl = `${url}?${query}`;
      }
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
    let response;
    try {
      let fullUrl = `${url}`;
      console.log(`[API] POST: ${fullUrl}`);
      response = await fetch(fullUrl, {
        body: JSON.stringify(form),
        method: 'POST',
        headers: { 'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error(error);
    } finally {
      if(asJson){
        return await response.json();
    }

    return response;
    }
  },
  createDefaultPatchRequest: async (url, form, asJson) => {
    let response;
    try {
      let fullUrl = `${url}`;
      console.log(`[API] PATCH: ${fullUrl}`);
      response = await fetch(fullUrl, {
        body: JSON.stringify(form),
        method: 'PATCH',
        headers: { 'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
    } finally {
      if(asJson){
        return await response.json();
      }

    return response;
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
  let data = null;
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
    let data = {
      name: form.name ?? "",
      imgUrl: form.imgUrl ?? ""
    }
    return await ApiClient.createDefaultPostRequest(`${baseUrl}/brands/create`, data);
  },
  /**
   * Update a brand
   * @returns {Response} api response
   */
  updateBrandAsync: async (form) => {
    let data = {
      id: form.id ?? defaultUuid,
      name: form.name ?? "",
      imgUrl: form.imgUrl ?? ""
    }
    return await ApiClient.createDefaultPatchRequest(`${baseUrl}/brands/update`, data);
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
   getCategoriesAsync: async (query) => {
    let data = null;
    if(query) {
      data = {
        search: query.search ?? "",
        isOrdered: query.isOrdered ?? false,
        strict: query.strict ?? false
      };
    }
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
      /**
   * Update a category
   * @returns {Response} api response
   */
  updateCategoryAsync: async (form) => {
    let data = {
      id: form.id ?? defaultUuid,
      title: form.title ?? "",
      description: form.description ?? "",
      idParent: form.idParent ?? defaultUuid
    }
    return await ApiClient.createDefaultPatchRequest(`${baseUrl}/categories/update`, data);
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
    /**
   * Get all the products from the api
   * @returns {Response} api response
   */
     getProductsAsync: async () => {
      let data = null;
      return await ApiClient.createDefaultGetRequest(`${baseUrl}/products`, data);
      },

    /**
   * Get all the products by a category from the api
   * @returns {Response} api response
   */
   getProductsByCategoryAsync: async (categoryId) => {
    let data = {
        categoryId: categoryId ?? defaultUuid,
    }
    return await ApiClient.createDefaultGetRequest(`${baseUrl}/products`, data);
    },
      /**
       * Delete all brand by id
       * @param {uuid} id
       * @returns {Response} api response
       */
      deleteProductBySkuAsync: async (sku, asJson) => {    
        return await ApiClient.createDefaultPostRequest(`${baseUrl}/products/delete`, {sku}, asJson);
      },
    
      /**
       * Create a new brand
       * @returns {Response} api response
       */
      createProductAsync: async (form) => {
        return await ApiClient.createDefaultPostRequest(`${baseUrl}/products/create`, form);
      },

      updateProductAsync: async (form) => {
        let data = {
          sku: form.sku ?? "",
          title: form.title ?? "",
          imgUrl: form.imgUrl ?? "",
          description: form.description ?? "",
          features: form.features ?? "",
          price: form.price ?? 0.00,
          brandId: form.brandId ?? defaultUuid,
          categoryId: form.categoryId ?? defaultUuid,
          weight: form.weight ?? 0,
          deliveryFees: form.deliveryFees ?? 0.00,
          highlighted: form.highlighted ?? false
        }
        return await ApiClient.createDefaultPatchRequest(`${baseUrl}/products/update`, data);
      },
   /************************************************************
   * 
   *                         CARRIERS
   * 
   ************************************************************/
  /**
   * Count all the carriers
   * @returns {Response} api response
   */
   countCarriersAsync: async () => {
    let data = {};
    return await ApiClient.createDefaultGetRequest(`${baseUrl}/carriers/count`, data, true);
  },
    /**
   * Get all the carriers from the api
   * @returns {Response} api response
   */
     getCarriersAsync: async () => {
      let data = null;
      return await ApiClient.createDefaultGetRequest(`${baseUrl}/carriers`, data);
      },
    /**
    * Delete carrier by id
    * @param {uuid} id
    * @returns {Response} api response
    */
    deleteCarrierByIdAsync: async (id, asJson) => {    
      return await ApiClient.createDefaultPostRequest(`${baseUrl}/carriers/delete`, {id}, asJson);
    },

}

export default ApiClient;