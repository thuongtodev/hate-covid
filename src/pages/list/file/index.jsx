/* eslint-disable no-restricted-properties */
/* eslint-disable no-underscore-dangle */
import { Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import moment from 'moment';

function formatBytes(a, b = 2) {
  if (a === 0) return '0 Bytes';
  const c = b < 0 ? 0 : b;
  const d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
    ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  }`;
}

const mapColor = {
  done: 'green',
  pending: 'blue',
  error: 'red',
};

const File = (props) => {
  const {
    file: { data },
    dispatch,
  } = props;

  useEffect(() => {
    dispatch({
      type: 'file/getData',
    });
  }, []);

  const columns = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      width: 50,
      render: (text, record, index) => index,
    },
    {
      title: 'ID File',
      dataIndex: '_id',
    },
    {
      title: 'ID Video',
      dataIndex: 'googleFileId',
    },
    {
      title: 'Video Name',
      dataIndex: 'fileName',
    },
    {
      title: 'Download Time',
      dataIndex: 'downloadTime',
      render: (val) => moment(val).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Upload Time',
      dataIndex: 'uploadTime',
      render: (val) => moment(val).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'File Size',
      dataIndex: 'fileSize',
      render: (text) => formatBytes(text),
    },
    {
      title: 'From Server',
      dataIndex: 'targetServer',
      render: (item, record) => (record.targetServer ? record.targetServer.serverName : ''),
    },
    {
      title: 'Status',
      dataIndex: 'downloadStatus',
      render: (text) => <Tag color={mapColor[text]}>{text}</Tag>,
    },
  ];

  return (
    <PageHeaderWrapper>
      <Table dataSource={data} columns={columns} rowKey="_id" />
    </PageHeaderWrapper>
  );
};

export default connect(({ file, loading }) => ({
  file,
  submitting: loading.effects['file/getData'],
}))(File);
