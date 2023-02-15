import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany, manyToMany,ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil'
import Publicacione from './Publicacione'
import Grupo from './Grupo'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true }) public codigo_usuario: number
  @column() public nombre_usuario: string
  @column() public contrasena: string
  @column() public email: string
  @column() public telefono: string

  /*relacion 1:1 con Perfil */
  @hasOne(()=>Perfil, {
    localKey: 'codigo_usuario',
    foreignKey:'codigo_usuario',
  } )
  public perfil: HasOne<typeof Perfil>


  /* relacion 1:n con publicaciones */
  @hasMany(()=>Publicacione, {
    localKey: 'codigo_usuario',
    foreignKey:'codigo_usuario',
  } )
  public publicaciones: HasMany<typeof Publicacione>

  /* relacion n:m con Grupo */
  @manyToMany(()=>Grupo, {
    localKey: 'codigo_usuario',
    pivotForeignKey:'codigo_usuario',
    relatedKey:'codigo_grupo',
    pivotRelatedForeignKey: 'codigo_grupo',
    pivotTable:'usuario_grupos',
  } )
  public usuario_grupos: ManyToMany<typeof Grupo>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
