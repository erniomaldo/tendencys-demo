import { Button, Col, Divider, Row, Table } from "antd";
import { useState } from "react";
import { formatedDateTime } from "../utils/strings";
import DatoOrden from "./DatoOrden";
import EditarProducto from "./EditarProducto";
import swal from 'sweetalert';


const EditarOrden = ({ orderSelected }) => {

  const [productos, setProductos] = useState(orderSelected.items);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(false);

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      sorter: {
        compare: (a, b) => a.sku.localeCompare(b.sku),
      }
    }, {
      title: 'Nombre',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
    }, {
      title: 'Cantidad',
      dataIndex: 'quantity',
      align: 'right',
      sorter: {
        compare: (a, b) => parseFloat(a.quantity) - parseFloat(b.quantity),
      }
    }, {
      title: 'Precio',
      dataIndex: 'price',
      align: 'right',
      sorter: {
        compare: (a, b) => parseFloat(a.price) - parseFloat(b.price),
      }
    }, {
      title: 'Acciones',
      render: row => <>
        <Button
          size="small"
          onClick={() => eliminaProducto(row.id)}
        >
          <i className="fas fa-trash"></i>
        </Button>
        <Button
          size="small"
          onClick={() => setProductoSeleccionado(row)}
        >
          <i className="fas fa-edit"></i>
        </Button>
      </>
    }
  ];

  const eliminaProducto = idProducto => {
    setProductos(productosActuales => productosActuales.filter(producto => producto.id !== idProducto));
  }

  const guardarProducto = (producto) => {
    let productosAEditar = productos;
    setCargando(true);
    setProductos(null);
    if (!producto.id) {
      producto = {
        ...producto,
        id: Math.random().toString()
      }
      productosAEditar.push(producto);
    } else {
      productosAEditar = productosAEditar.map(productoActual => {
        return productoActual.id === producto.id ? producto : productoActual;
      })
    }
    setTimeout(() => {
      setProductos(productosAEditar);
      setCargando(false);
    }, 1);
    setProductoSeleccionado(null);
  }

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={24} lg={12}>
          <Row>
            <Col span={24}>
              <Divider orientation="left">Compra</Divider>
              <Row>
                <Col span={24} md={20}>
                  <Row>
                    <DatoOrden titulo={<>Orden</>} contenido={orderSelected.number} />
                    <DatoOrden titulo={<>Cliente</>} contenido={orderSelected.name} />
                    <DatoOrden titulo={<>Fecha de compra</>} contenido={formatedDateTime(orderSelected.dates.createdAt)} />
                  </Row>
                </Col>
                <Col span={24} md={4}>
                  <Button onClick={() => swal("¡Gracias por tu compra!", "Te hemos enviado un correo electrónico con los detalles de la compra.", "success")}>
                    Pagar
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Divider orientation="left">Envío</Divider>
              <Row>
                <DatoOrden
                  fullWidth={true}
                  titulo={<>Nombre</>}
                  contenido={<>{orderSelected.shippingAddress.firstName} {orderSelected.shippingAddress.lastName}</>}
                />
                <DatoOrden
                  fullWidth={true}
                  titulo={<>Dirección</>}
                  contenido={<>{orderSelected.shippingAddress.address1} {orderSelected.shippingAddress.address2 || null} CP: {orderSelected.shippingAddress.postalCode}</>}
                />
                <DatoOrden
                  fullWidth={true}
                  titulo={<>Ciudad</>}
                  contenido={orderSelected.shippingAddress.city}
                />
                <DatoOrden
                  fullWidth={true}
                  titulo={<>Estado</>}
                  contenido={orderSelected.shippingAddress.state.name}
                />
                <DatoOrden
                  fullWidth={true}
                  titulo={<>País</>} country
                  contenido={orderSelected.shippingAddress.state.name}
                />
              </Row>
            </Col>
            <Col span={12}>
              <Divider orientation="left">Facturación</Divider>
              <Row>
                <DatoOrden
                  fullWidth={true}
                  titulo={<>Nombre</>}
                  contenido={<>{orderSelected.billingAddress.firstName} {orderSelected.billingAddress.lastName}</>}
                />
                <DatoOrden
                  fullWidth={true}
                  titulo={<>Dirección</>}
                  contenido={<>{orderSelected.billingAddress.address1} {orderSelected.billingAddress.address2 || null} CP: {orderSelected.billingAddress.postalCode}</>}
                />
                <DatoOrden
                  fullWidth={true}
                  titulo={<>Ciudad</>}
                  contenido={orderSelected.billingAddress.city}
                />
                <DatoOrden
                  fullWidth={true}
                  titulo={<>Estado</>}
                  contenido={orderSelected.billingAddress.state.name}
                />
                <DatoOrden
                  fullWidth={true}
                  titulo={<>País</>} country
                  contenido={orderSelected.billingAddress.state.name}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} lg={12}>
          <Row>
            <Col span={21} style={{ paddingRight: 12 }}>
              <Divider orientation="left">Artículos</Divider>
            </Col>
            <Col span={3}>
              <Button
                size="large"
                block={true}
                style={{ marginTop: 8 }}
                onClick={() => setProductoSeleccionado({})}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </Col>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={productos}
                rowKey={record => record.id}
                loading={cargando}
                summary={pageData => {
                  let totalBorrow = 0.00;

                  pageData.forEach(({ price }) => {
                    totalBorrow += parseFloat(price);
                  });

                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={3} align="right"><strong>Total</strong></Table.Summary.Cell>
                        <Table.Summary.Cell align="right">
                          <strong>{totalBorrow.toFixed(2)}</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell>&nbsp;</Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <EditarProducto
        productoSeleccionado={productoSeleccionado}
        setProductoSeleccionado={setProductoSeleccionado}
        guardarProducto={guardarProducto}
      />
    </>
  );
}

export default EditarOrden;