/* eslint-disable no-underscore-dangle */
import { Table, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import moment from 'moment';

const TableList = (props) => {
  const {
    ggdrive: { data, url },
    dispatch,
  } = props;

  useEffect(() => {
    dispatch({
      type: 'ggdrive/getData',
    });
    dispatch({
      type: 'ggdrive/getLink',
    });
  }, []);
  const handleDeleteAccount = (id) => {
    dispatch({
      type: 'ggdrive/deleteLink',
      payload: { id },
    });
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      width: 50,
      render: (text, record, index) => index,
    },
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Linked Date',
      dataIndex: 'linkDate',
      sorter: true,
      render: (val) => moment(val).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => handleDeleteAccount(record._id)}>Delete</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <Row justify="end" style={{ marginBottom: 15 }}>
        <Col md="12">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="ant-btn ant-btn-primary"
          >
            Link
          </a>
        </Col>
      </Row>
      <Table dataSource={data} columns={columns} rowKey="_id" />
    </PageHeaderWrapper>
  );
};

export default connect(({ ggdrive, loading }) => ({
  ggdrive,
  submitting: loading.effects['ggdrive/getData'],
}))(TableList);
