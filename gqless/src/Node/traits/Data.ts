import { StaticExtension, ComputableExtension, Extension } from '../Extension'
import { Accessor } from '../../Accessor'
import { Selection } from '../../Selection'
import { Value } from '../../Cache'
import { accessorInterceptors } from '../../Interceptor'

export type DataContext<TNode extends DataTrait = DataTrait> = {
  accessor?: Accessor<Selection<TNode>>
  selection?: Selection<TNode>
  extensions?: Extension[]
  value?: Value
}

export const interceptAccessor = (ctx: DataContext) => {
  if (!ctx.accessor) return

  accessorInterceptors.forEach(intercept => intercept(ctx.accessor!))
}

export const getExtensions = (ctx: DataContext) => {
  if (ctx.extensions) return ctx.extensions
  if (ctx.accessor) return ctx.accessor._extensions

  return []
}

export const getSelection = (ctx: DataContext) => {
  if (ctx.selection) return ctx.selection
  if (ctx.accessor) return ctx.accessor._selection

  return
}

export const getValue = (ctx: DataContext) => {
  if (ctx.value) return ctx.value
  if (ctx.accessor) return ctx.accessor._value

  return
}

export interface DataTrait {
  _extension?: StaticExtension | ComputableExtension
  getData(ctx: DataContext): any
}
