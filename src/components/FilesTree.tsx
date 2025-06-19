import React, { useEffect, useState, type ReactNode } from 'react';
import { Tree, type TreeProps } from 'antd';
import { getFilesList } from './utils/getFilesList';
import _ from 'lodash';

type treeDataType = {
  title: string;
  key?: string;
  icon?: ReactNode;
  children?: treeDataType[];
};

const FilesTree: React.FC = () => {
  useEffect(() => {
    (async () => {
      const files = await getFilesList();

      const localTreeData: treeDataType[] = [];
      for (const k in files) {
        const localMainNode: treeDataType = {
          title: k,
          children: [],
        };
        const groupped = _.groupBy(files[k], (e) => e.doc_type);
        for (const inside in groupped) {
          localMainNode.children?.push({
            title: inside,
            children: groupped[inside].map((e) => ({ title: e.document_name })),
          });
          groupped[inside].map((e) => e.document_name);
        }
        localTreeData.push(localMainNode);
      }

      setTreeData(localTreeData);
    })();
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showLine, setShowLine] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showIcon, setShowIcon] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showLeafIcon, setShowLeafIcon] = useState<React.ReactNode>(true);
  const [treeData, setTreeData] = useState<treeDataType[]>([]);

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info.node.title);
  };

  const onSelect = (selectedKeys: React.Key[], info: unknown) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <div>
      <Tree
        showLine={showLine ? { showLeafIcon } : false}
        showIcon={showIcon}
        defaultExpandedKeys={['']}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
      />
    </div>
  );
};

export default FilesTree;
