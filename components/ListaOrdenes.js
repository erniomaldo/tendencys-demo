import { Breadcrumb, Button, Table } from "antd";
import { useEffect, useState } from "react";
import { formatedDateTime } from "../utils/strings";

const URL = 'https://eshop-deve.herokuapp.com/api/v2/orders';
const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYwNTY0NDA0NzA1OH0.skfIY_7CAANkxmhoq37OI4jYRE8flx1ENq1v1VaRevJiroYNFQYz7Oy6hL1YZ1OJkevXSQFuLMHTqY0w6d5nPQ';


const ListaOrdenes = ({ setOrderSelected }) => {

  const columns = [
    {
      title: 'ID',
      render: row => <>
        <Button
          style={{
            marginRight: 12
          }}
          onClick={() => setOrderSelected(row)}
        ><i className="fas fa-edit"></i></Button>
        {row.number}
      </>,
      sorter: {
        compare: (a, b) => a.number - b.number,
      }
    }, {
      title: 'Fecha',
      dataIndex: ['dates', 'createdAt'],
      render: createdAt => formatedDateTime(createdAt),
      sorter: {
        compare: (a, b) => {
          return new Date(a.dates.createdAt).getTime() - new Date(b.dates.createdAt).getTime()
        },
      },
    }, {
      title: 'Nombre',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.id.localeCompare(b.id),
      }
    }, {
      title: 'Productos',
      dataIndex: 'items',
      render: items => items.length,
      sorter: {
        compare: (a, b) => a.items.length - b.items.length,
      }
    }, {
      title: 'Total',
      render: row => <>{row.currency} {row.totals.total}</>,
      align: 'right',
      sorter: {
        compare: (a, b) => a.totals.total - b.totals.total,
      }
    },
  ];

  const [listaOrdenes, setListaOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const obtieneOrdenes = async () => {
    setCargando(true);
    const resultado = await (await fetch(URL, {
      headers: {
        'authorization': token
      }
    })).json();
    setCargando(false);
    setListaOrdenes(resultado.orders);
  }

  useEffect(() => {
    obtieneOrdenes();
  }, []);

  return (
    <>
      {cargando
        ? <><i className="fas fa-circle-notch fa-spin"></i> Cargando</>
        : listaOrdenes.length > 0
          ? <Table
            columns={columns}
            dataSource={listaOrdenes}
            rowKey={record => record.id}
          />
          : <><i className="fas fa-exclamation-triangle"></i> No hay resultados</>
      }
    </>
  );
}

export default ListaOrdenes;