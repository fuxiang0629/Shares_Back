import { getPageQuery } from '@/utils/utils';
import { Button, Checkbox, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { queryRoleRightList, updateRoleRight } from '../service';
import styles from './index.less';
const params = getPageQuery();
const { TabPane } = Tabs;

const roleList = () => {
  const [roleList, setRoleList] = useState([]);
  const [menuId, setMenuId] = useState(-1);

  useEffect(() => {
    queryRoleRightList({
      RoleId: params.Id,
    }).then((res) => {
      console.log(res.Data);
      setMenuId(res.Data[0].MenuId);
      setRoleList(res.Data);
    });
  }, []);

  /**
   * 提交
   */
  const handleSubmit = async () => {
    let selectedRoleList = [];
    roleList.map((item1) => {
      if (item1.MenuId == menuId) {
        item1.MenuList.map((item2) => {
          item2.MenuList.map((item3) => {
            item3.RightList.map((item4) => {
              if (item4.IsCheck) {
                selectedRoleList.push(item4.RightId);
              }
            });
          });
        });
      }
    });

    const hide = message.loading('正在更新');
    try {
      const res = await updateRoleRight({
        RoleId: params.Id,
        MenuId: menuId,
        RightIdList: selectedRoleList,
      });
      if (!res.ErrorCode) {
        hide();
        message.success('更新成功');
        return true;
      } else {
        throw res.ErrorMessage;
      }
    } catch (error) {
      hide();
      message.error(error);
      return false;
    }
  };

  const handleTabsChange = (id) => {
    setMenuId(id);
  };

  /**
   * Checkbox 切换
   * @param {*} ent
   * @param {*} val
   */
  const handleCheckboxChange = (ent, val) => {
    roleList.map((item1) => {
      if (item1.MenuId == menuId) {
        item1.MenuList.map((item2) => {
          item2.MenuList.map((item3) => {
            item3.RightList.map((item4) => {
              if (item4.RightId == val) {
                item4.IsCheck = ent.target.checked;
              }
            });
          });
        });
      }
    });
  };

  return (
    <div className={styles.main}>
      <Tabs defaultActiveKey={menuId} onChange={handleTabsChange} style={{ height: '100%' }}>
        {roleList.map((item1) => {
          return (
            <TabPane tab={item1.MenuTitle} key={item1.MenuId} style={{ minHeight: '100vh' }}>
              {item1.MenuList.map((item2, index2) => {
                return (
                  <div
                    key={index2}
                    style={index2 !== 0 ? { marginTop: '20px' } : { marginTop: '0px' }}
                  >
                    <h3>{item2.MenuTitle}</h3>
                    {item2.MenuList.map((item3, index3) => {
                      return (
                        <div key={index3} style={{ marginTop: '20px' }}>
                          <h5>{item3.MenuTitle}</h5>

                          {item3.RightList.map((item4, index4) => {
                            return (
                              <div
                                key={index4}
                                style={{
                                  display: 'inline-block',
                                  marginLeft: '10px',
                                }}
                              >
                                <Checkbox
                                  defaultChecked={item4.IsCheck}
                                  onChange={(evt) => handleCheckboxChange(evt, item4.RightId)}
                                >
                                  {item4.RightName}
                                </Checkbox>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <Button
                onClick={handleSubmit}
                type="primary"
                htmlType="submit"
                style={{
                  marginTop: '50px',
                }}
              >
                保存
              </Button>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default roleList;
