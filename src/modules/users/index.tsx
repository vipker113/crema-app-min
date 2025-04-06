import React, { useState, useRef } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Popconfirm,
  Form,
  Modal,
  Select,
  message,
  Tag,
} from "antd";
import { SearchOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { Plus, SquarePen, Trash2 } from "lucide-react";

type TMember = {
  id: number;
  name: string;
  accountName: string;
  email?: string;
  role: string;
  status: string;
  blog?: number;
};

const initialData: TMember[] = [
  {
    id: 1,
    name: "Lê Văn Trung",
    accountName: "Van Trung Le",
    email: "admin@wponeclick.com",
    role: "Admin",
    status: "Active",
    blog: 12,
  },
  {
    id: 2,
    name: "John Doe",
    accountName: "johndoe",
    email: "johndoe121@gmail.com",
    role: "Member",
    status: "Active",
    blog: 12,
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 3,
    name: `User ${i + 3}`,
    accountName: `user${i + 3}`,
    email: `user${i + 3}@example.com`,
    role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Member" : "Editor",
    status: i % 2 === 0 ? "Active" : "Inactive",
    blog: i + 1,
  })),
];

type DataIndex = keyof TMember;

const User = () => {
  const [memberData, setMemberData] = useState<TMember[]>(initialData);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<TMember | null>(null);
  const [form] = Form.useForm();

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string, record: TMember) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase()) ?? false,
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleDelete = (id: number) => {
    setMemberData(memberData.filter((item) => item.id !== id));
    message.success("User deleted successfully");
  };

  const showModal = (record?: TMember) => {
    if (record) {
      setEditingMember(record);
      form.setFieldsValue(record);
    } else {
      setEditingMember(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingMember) {
        // Update existing user
        setMemberData(
          memberData.map((member) =>
            member.id === editingMember.id ? { ...member, ...values } : member
          )
        );
        message.success("User updated successfully");
      } else {
        // Add new user
        const newUser: TMember = {
          id: Math.max(...memberData.map((m) => m.id)) + 1,
          ...values,
        };
        setMemberData([...memberData, newUser]);
        message.success("User added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns: ColumnsType<TMember> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "Member", value: "Member" },
        { text: "Editor", value: "Editor" },
      ],
      onFilter: (value: string, record) => record.role === value,
      render: (role) => {
        let color = "green";
        if (role === "Admin") {
          color = "red";
        } else if (role === "Editor") {
          color = "blue";
        }
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value: string, record) => record.status === value,
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Blogs",
      dataIndex: "blog",
      key: "blog",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => showModal(record)}
            className="flex items-center gap-2"
          >
            <SquarePen size={16} />
            <span>Edit</span>
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger className="flex items-center gap-2">
              <Trash2 size={16} />
              <span>Delete</span>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>User Management</h1>
      <div className="my-10 flex flex-col gap-4">
        <Button
          type="primary"
          className="flex items-center gap-1 w-fit"
          onClick={() => showModal()}
        >
          <Plus size={16} />
          <span>Add User</span>
        </Button>
        <Table
          columns={columns}
          dataSource={memberData}
          rowKey="id"
          className="bg-white rounded-lg shadow-md border border-gray-200 th:bg-gray-800"
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal
        title={editingMember ? "Edit User" : "Add User"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={editingMember ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="accountName"
            label="Account Name"
            rules={[{ required: true, message: "Please enter account name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Member">Member</Select.Option>
              <Select.Option value="Editor">Editor</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="blog" label="Blogs">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
