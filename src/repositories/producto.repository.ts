import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Pedidos} from '../models';
import {PedidosRepository} from './pedidos.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly pedidos: HasOneRepositoryFactory<Pedidos, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Producto, dataSource);
    this.pedidos = this.createHasOneRepositoryFactoryFor('pedidos', pedidosRepositoryGetter);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
