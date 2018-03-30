<template>
	<div class="box">
		<el-col :span="24" class="serach">
			<el-form :inline="true">
				<el-form-item>
					<el-input placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="mini" @click="getUsers">
						查询
					</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="mini">
						新增
					</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-loading="listLoading">
		    <el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column type="index" label="序号" width="120">
		    </el-table-column>
		    <el-table-column prop="name" label="姓名" width="120" sortable>
		    </el-table-column>
		    <el-table-column prop="sex" label="性别" width="120" sortable>
		    </el-table-column>
		    <el-table-column prop="age" label="年龄" width="120" sortable>
		    </el-table-column>
		    <el-table-column prop="birth" label="生日" width="120" sortable>
		      <template slot-scope="scope">{{ scope.row.date }}</template>
		    </el-table-column>
		    <el-table-column prop="addr" label="地址" show-overflow-tooltip sortable>
		    </el-table-column>
		  </el-table>
		  <div class="pagination">
		  	<el-button type="danger" size="mini" disabled class="danger-btn">
		  		批量删除
		  	</el-button>
		  	<el-pagination layout="prev, pager, next"  :page-size="20" :total="1000" style="float:right;">
			</el-pagination>
		  </div>
	</div>
</template>
<script>
 import util from '../../common/js/util'
 import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
  export default {
    data() {
      return {
      	filters:{
      		name:''
      	},
      	page: 1,
      	listLoading: false,
        tableData3: [],
        multipleSelection: []
      }
    },
    methods: {
      getUsers() {
		let para = {
			page: this.page,
			name: this.filters.name
		};
		this.listLoading = true;
		getUserListPage(para).then((res) => {
			this.tableData3 = res.data.users;
			this.listLoading = false;
		}).catch((err) => {
			console.log(err);
		});
	},
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
    },
    mounted(){
	  	this.getUsers();
	  }
  }
</script>
<style lang="less" scoped>
	.box {
		box-shadow: 0 0 2px rgba(0,0,0,0.4);
		border-radius: 5px;
		padding-bottom: 20px;
		overflow: hidden;
		.serach {
			margin-top: 10px;
			padding-left: 10px
		}
		.pagination {
			margin-top: 20px;
			.danger-btn {
				margin-left: 15px
			}
		}
	}
</style>