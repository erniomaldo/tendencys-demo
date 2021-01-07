import { Col, Comment } from "antd";
import { formatedDateTime } from "../utils/strings";

const DatoOrden = ({ fullWidth, titulo, contenido }) => {
  return (
    <Col span={24} md={fullWidth ? 24 : 12} lg={fullWidth ? 24 : 8}>
      <Comment
        author={titulo}
        content={
          <p>{contenido}</p>
        }
        className="dato-orden"
      />
    </Col>
  );
}

export default DatoOrden;