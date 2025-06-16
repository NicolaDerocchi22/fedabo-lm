import React, { useEffect, useState, type ReactNode } from 'react';
import { Tree } from 'antd';
import { getFilesList } from './utils/getFilesList';
import _ from 'lodash';

type treeDataType = {
    title: string,
    key?: string,
    icon?: ReactNode,
    children?: treeDataType[]
}

const FilesTree: React.FC = () => {
    useEffect(() => {
        (async () => {
            const files = await getFilesList();

            const localTreeData: treeDataType[] = [];
            for (const k in files) {
                const localMainNode: treeDataType = {
                    title: k,
                    children: []
                };
                const groupped = _.groupBy(files[k], e => e.doc_type);
                for (const inside in groupped) {
                    localMainNode.children?.push(
                        {
                            title: inside,
                            children: groupped[inside].map(e => ({ title: e.document_name }))
                        }
                    );
                    groupped[inside].map(e => e.document_name)
                }
                localTreeData.push(localMainNode);
            };

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
    };

    // const handleLeafIconChange = (value: 'true' | 'false' | 'custom') => {
    //     if (value === 'custom') {
    //         return setShowLeafIcon(<CheckOutlined />);
    //     }

    //     if (value === 'true') {
    //         return setShowLeafIcon(true);
    //     }

    //     return setShowLeafIcon(false);
    // };

    return (
        <div>
            {/* <div style={{ marginBottom: 16 }}>
                showLine: <Switch checked={!!showLine} onChange={setShowLine} />
                <br />
                <br />
                showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
                <br />
                <br />
                showLeafIcon:{' '}
                <Select defaultValue="true" onChange={handleLeafIconChange}>
                    <Select.Option value="true">True</Select.Option>
                    <Select.Option value="false">False</Select.Option>
                    <Select.Option value="custom">Custom icon</Select.Option>
                </Select>
            </div> */}
            <Tree
                showLine={showLine ? { showLeafIcon } : false}
                showIcon={showIcon}
                defaultExpandedKeys={['']}
                onSelect={onSelect}
                treeData={treeData}
            />
        </div>
    );
};

export default FilesTree;