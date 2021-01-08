import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";

const EditarProducto = ({ productoSeleccionado, setProductoSeleccionado, guardarProducto }) => {

  const [producto, setProducto] = useState(null);
  const [puedeGuardar, setPuedeGuardar] = useState(false);

  const limpiaProducto = () => {
    setProductoSeleccionado(null);
    setTimeout(() => {
      setProducto(null);
    }, 500);
  }

  useEffect(() => {
    if (productoSeleccionado) {
      setProducto(productoSeleccionado)
    } else {
      limpiaProducto();
    }
  }, [productoSeleccionado]);

  useEffect(() => {
    setPuedeGuardar(
      producto &&
        (producto.sku && producto.sku !== '') &&
        (producto.name && producto.name !== '') &&
        (producto.quantity && producto.quantity !== '') &&
        (producto.price && producto.price !== '')
        ? false
        : true
    )
  }, [producto]);

  return (
    <Modal
      title={producto && producto.sku ? 'Editar producto' : 'Nuevo producto'}
      visible={productoSeleccionado ? true : false}
      onCancel={limpiaProducto}
      footer={[
        <Button
          key="back"
          onClick={limpiaProducto}
        ><i className="fas fa-times"></i>&nbsp;Cancelar</Button>,
        <Button
          key="submit"
          type="primary"
          disabled={puedeGuardar}
          onClick={() => guardarProducto(producto)}
        ><i className="fas fa-save"></i>&nbsp;Guardar</Button>,
      ]}
    >
      {producto
        ? <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          layout="horizontal"
          initialValues={producto}
          onValuesChange={(e) => setProducto({
            ...producto,
            [Object.keys(e)[0]]: e[Object.keys(e)[0]]
          })}
          size="large"
        >
          <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: 'Ingresa el SKU del producto' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: 'Ingresa el nombre del producto' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Cantidad"
            rules={[{ required: true, message: 'Indica la cantidad del producto' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Precio"
            rules={[{ required: true, message: 'Indica el precio del producto' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
        : null}
    </Modal >
  );
}

export default EditarProducto;