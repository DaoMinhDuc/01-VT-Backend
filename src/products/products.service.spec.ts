import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product, ProductCategory } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, CreateProductCategoryDto } from './dto/product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepo: Repository<Product>;
  let categoryRepo: Repository<ProductCategory>;

  const mockProductRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockCategoryRepo = {
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepo,
        },
        {
          provide: getRepositoryToken(ProductCategory),
          useValue: mockCategoryRepo,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepo = module.get<Repository<Product>>(getRepositoryToken(Product));
    categoryRepo = module.get<Repository<ProductCategory>>(getRepositoryToken(ProductCategory));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all active products when no search is provided', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1' }];
      mockProductRepo.find.mockResolvedValue(mockProducts);

      const result = await service.findAll();

      expect(productRepo.find).toHaveBeenCalledWith({
        where: { isActive: true },
        relations: ['category'],
        order: { name: 'ASC' },
      });
      expect(result).toEqual(mockProducts);
    });

    it('should return filtered products when search is provided', async () => {
      const mockProducts = [{ id: 1, name: 'Test Product' }];
      mockProductRepo.find.mockResolvedValue(mockProducts);

      const result = await service.findAll('Test');

      expect(productRepo.find).toHaveBeenCalledWith({
        where: [
          { isActive: true, name: expect.anything() },
          { isActive: true, code: expect.anything() },
        ],
        relations: ['category'],
        order: { name: 'ASC' },
      });
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      const mockProduct = { id: 1, name: 'Product 1' };
      mockProductRepo.findOne.mockResolvedValue(mockProduct);

      const result = await service.findOne(1);

      expect(productRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['category'],
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException if product is not found', async () => {
      mockProductRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new product', async () => {
      const createDto: CreateProductDto = { name: 'New Product', code: 'NP01', unitPrice: 100 };
      const mockCreatedProduct = { id: 1, ...createDto };
      
      mockProductRepo.create.mockReturnValue(createDto);
      mockProductRepo.save.mockResolvedValue(mockCreatedProduct);

      const result = await service.create(createDto);

      expect(productRepo.create).toHaveBeenCalledWith(createDto);
      expect(productRepo.save).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCreatedProduct);
    });
  });

  describe('update', () => {
    it('should update and return the product', async () => {
      const updateDto: UpdateProductDto = { name: 'Updated Product' };
      const mockProduct = { id: 1, name: 'Old Product' };
      mockProductRepo.findOne
        .mockResolvedValueOnce(mockProduct)
        .mockResolvedValueOnce({ ...mockProduct, ...updateDto });
      mockProductRepo.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, updateDto);

      expect(productRepo.update).toHaveBeenCalledWith(1, updateDto);
      expect(result.name).toEqual('Updated Product');
    });

    it('should throw NotFoundException if product to update is not found', async () => {
      mockProductRepo.findOne.mockResolvedValue(null);
      await expect(service.update(1, { name: 'Test' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should soft delete the product (isActive: false)', async () => {
      const mockProduct = { id: 1, name: 'Product 1', isActive: true };
      mockProductRepo.findOne.mockResolvedValue(mockProduct);
      mockProductRepo.update.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(productRepo.update).toHaveBeenCalledWith(1, { isActive: false });
      expect(result).toEqual({ message: 'Đã xóa' });
    });

    it('should throw NotFoundException if product to remove is not found', async () => {
      mockProductRepo.findOne.mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('Categories', () => {
    it('should return all categories', async () => {
      const mockCategories = [{ id: 1, name: 'Category 1' }];
      mockCategoryRepo.find.mockResolvedValue(mockCategories);

      const result = await service.findAllCategories();

      expect(categoryRepo.find).toHaveBeenCalledWith({ order: { name: 'ASC' } });
      expect(result).toEqual(mockCategories);
    });

    it('should create a new category', async () => {
      const createDto: CreateProductCategoryDto = { name: 'New Cat', code: 'CAT01' };
      const mockCreatedCat = { id: 1, ...createDto };
      
      mockCategoryRepo.create.mockReturnValue(createDto);
      mockCategoryRepo.save.mockResolvedValue(mockCreatedCat);

      const result = await service.createCategory(createDto);

      expect(categoryRepo.create).toHaveBeenCalledWith(createDto);
      expect(categoryRepo.save).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCreatedCat);
    });
  });
});
