const brand_ctrl = require('../controllers/brand');

module.exports = [
	
	{
		url: '/brand',
		method: 'get',
		func: brand_ctrl.get_all
	},
	{
		url: '/brand',
		method: 'post',
		func: brand_ctrl.create
	},
	{
		url: '/brand/:brand_id',
		method: 'get',
		func: brand_ctrl.get_by_id
	},
	{
		url: '/brand/:brand_id',
		method: 'put',
		func: brand_ctrl.update_by_id
	},
	{
		url: '/brand/:brand_id',
		method: 'delete',
		func: brand_ctrl.delete_by_id
	}
	
];
