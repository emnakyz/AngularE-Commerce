using API.Core.DbModels;
using API.Core.Interfaces;
using API.Core.Specifications;
using API.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    //https:localhost:5001/api/products/GetProduct
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        //private readonly StoreContext _context;
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IGenericRepository<ProductBrand> _productBrandRepository;
        private readonly IGenericRepository<ProductType> _productTypeRepository;
        public ProductsController(IGenericRepository<Product> productRepository, IGenericRepository<ProductBrand> productBrandRepository, IGenericRepository<ProductType> productTypeRepository)
        {
            //_context = context;
            _productRepository = productRepository;
            _productBrandRepository = productBrandRepository;
            _productTypeRepository = productTypeRepository;
        }


        [HttpGet]//http verbs -> get post delete put
        public async Task<ActionResult<List<ProductToReturnDto>>> GetProducts()
        {
            var spec = new  ProductsWithProductTypeAndBrandsSpecification();
            var data = await _productRepository.ListAsync(spec);
            //return Ok(data);
            return data.Select(pro => new ProductToReturnDto
            {
                Id = pro.Id,
                Name = pro.Name,
                PictureUrl = pro.PictureUrl,
                Description = pro.Description,
                Price = pro.Price,
                ProductBrand = pro.ProductBrand != null ? pro.ProductBrand.Name : string.Empty,
                ProductType = pro.ProductType != null ? pro.ProductType.Name : string.Empty

            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithProductTypeAndBrandsSpecification(id);

            //return await _productRepository.GetEntityWithSpec(spec);

            var product = await _productRepository.GetEntityWithSpec(spec);
            return new ProductToReturnDto
            {
                Id = product.Id,
                Name = product.Name,
                PictureUrl = product.PictureUrl,
                Description  = product.Description,
                Price = product.Price,
                ProductBrand = product.ProductBrand !=null? product.ProductBrand.Name:string.Empty,
                ProductType = product.ProductType != null? product.ProductType.Name:string.Empty
            };
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productBrandRepository.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepository.ListAllAsync());
        }

    }
}
