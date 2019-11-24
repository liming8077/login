import { stringify } from 'qs';
import request from '../utils/request';

export async function queryPost() {
  return request(`/company/post`);
}
export async function addPost(params) {
  return request('/company/post', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function getPost(params) {
  return request(`/company/post/${params}`);
}

export async function editPost(params) {
  return request(`/company/post/${params.id}`,{
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function removePost(params) {
  return request(`/company/post/${params}`,{
    method: 'DELETE',
  });
}

export async function sortPost(params) {
  return request(`/company/post/sort/${params.id}`,{
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function exportPost() {
  return request(`/company/post/excel`);
}

//递归数据接口
export async function queryDepartment() {
  return request(`/company/department/tree`);
}

export async function getDepartmentTree(params) {
  return request(`/company/department/tree/${params}`);
}

export async function addDepartment(params) {
  return request('/company/department', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getDepartment(params) {
  return request(`/company/department/${params}`);
}

export async function getStore(params) {
  return request(`/company/department?${stringify(params)}`);
}

export async function editDepartment(params) {
  return request(`/company/department/${params.id}`,{
    method: 'PUT',
    body: {
      ...params,
    },
  });
}


export async function sortDepartment(params) {
  return request(`/company/department/sort/${params.id}`,{
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function removeDepartment(params) {
  return request(`/company/department/${params}`,{
    method: 'DELETE',
  });
}

export async function exportDepartment() {
  return request(`/company/department/excel`);
}

export async function getTags(params) {
  return request(`/company/label/${params}`);
}

export async function queryTags() {
  return request(`/company/label`);
}

export async function addTags(params) {
  return request('/company/label', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function editTags(params) {
  return request(`/company/label/${params.id}`,{
    method: 'PUT',
    body: {
      ...params,
    },
  });
}


export async function removeTags(params) {
  return request(`/company/label/${params}`,{
    method: 'DELETE',
  });
}

export async function getTeacherTags() {
  return request(`/course/teacher-tag`);
}

export async function addTeacherTags(params) {
  return request('/course/teacher-tag', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function removeTeacherTags(params) {
  return request(`/course/teacher-tag/${params}`,{
    method: 'DELETE',
  });
}

export async function getExamList(params) {
  return request(`/exam/exam-manager?${stringify(params)}`);
}

export async function getExamDetail(params) {
  return request(`/exam/exam-manager/detail/${params.id}`);
}


export async function getExamMark(params) {
  return request(`/exam/exam-group-student?${stringify(params)}`);
}

export async function getExamMarkSubject(params) {
  return request(`/exam/exam-group-student/${params.id}`);
}

export async function getStatisticSubject(params) {
  return request(`/exam/exam-manager/question-detail/${params.id}`);
}

export async function subMarkSubject(params) {
  return request(`/exam/exam-group-student/${params.id}`, {
    method: 'PUT',
    body: params
  });
}

export async function removeExam(params) {
  return request('/exam/exam-manager/empty', {
    method: 'PUT',
    body: params
  })
}

export async function addTeacher(params) {
  return request('/course/teacher', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function editTeacher(params) {
  return request(`/course/teacher/${params.teacher_id}`,{
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function removeTeacher(params) {
  return request(`/course/teacher/${params.teacher_id}`,{
    method: 'DELETE',
  });
}

export async function examInfo(params) {
  return request('/exam/exam-manager/base-info', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function examAddMember(params) {
  return request('/exam/exam-manager/student', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function examManagerTeacher(params) {
  return request('/exam/exam-manager/teacher', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function examDelMember(params) {
  return request('/exam/exam-manager/student', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function examGetMember(params) {
  return request(`/exam/exam-manager/student?${stringify(params)}`);
}

export async function examGetPaper(params) {
  return request(`/exam/paper?${stringify(params)}`);
}

export async function examGetInfo(params) {
  return request(`/exam/exam-manager/${params.id}`);
}

export async function examEdit(params) {
  return request(`/exam/exam-manager/${params.exam_group_id}`,{
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function getTeacher(params) {
  return request(`/course/teacher?${stringify(params)}`);
}

export async function setFeedback(params) {
  return request(`/company/feed-back`, {
    method: 'POST',
    body: params,
  });
}

export async function queryCourseApproval(params) {
  return request(`/company/request?${stringify(params)}`);
}

export async function setCourseApproval(params) {
  return request(`/company/request`,{
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function labelAddUser(params) {
  return request(`/company/label-user`, {
    method: 'POST',
    body: params,
  });
}
export async function labelDelUser(params) {
  return request(`/company/label-user/${params.label_id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function queryContacts(params) {
  return request(`/company/account?${stringify(params)}`);
}
export async function getContacts(params) {
  return request(`/company/account/${params}`);
}
export async function editContacts(params) {
  return request(`/company/account/${params.id}`,{
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function fieldContacts(params) {
  return request('/company/account/field', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function removeContacts(params) {
  return request('/company/account', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

export async function addContacts(params) {
  return request('/company/account', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function exportContacts() {
  return request(`/company/account/excel`);
}

export async function exportContactsError(params) {
  return request(`/company/${params}/excel-error`);
}

export async function exportContactsTemplate() {
  return request(`/company/account/template`);
}

export async function exportSmsContacts() {
  return request(`/company/account/sms-excel`);
}

export async function exportResources(params) {
  return request(`/company/knowledge-class/resource-export?${stringify(params)}`);
}

export async function exportDocument(params) {
  return request(`/company/document/document-export?${stringify(params)}`);
}
export async function docDocument(params) {
  return request(`/company/doc-server/download?documentId=${params}`);
}

export async function validationContacts(params) {
  return request(`/company/account/validation`, {
    method: 'POST',
    body: params,
  });
}

export async function validation_list(params) {
  return request('/company/account/validation-list', {
    method: 'POST',
    body: params,
  });
}

//app 设置
export async function appBannerList(params) {
  return request(`/company/banner?${stringify(params)}`);
}

export async function appAddBanner(params) {
  return request('/company/banner', {
    method: 'POST',
    body: params,
  });
}

export async function appEditBanner(params) {
  return request(`/company/banner/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function appSwapBanner(params) {
  return request(`/company/banner/sort/${params.id}`, {
    method: 'PUT',
    body: {
      front_id:params.front_id
    },
  });
}

export async function appDelBanner(params) {
  return request(`/company/banner/${params.id}`, {
    method: 'DELETE',
  });
}

export async function appManageList(params) {
  return request(`/company/application?${stringify(params)}`);
}

export async function appSet(params) {
  return request(`/company/application/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function appReset(params) {
  return request(`/company/application/reset`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function appHomeList(params) {
  return request(`/company/application/home`);
}

export async function appFunList(params) {
  return request(`/company/company-setting/modules`);
}

export async function appFunSet(params) {
  return request(`/company/company-setting/modules`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function appFunReset(params) {
  return request(`/company/company-setting/modules`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function appImgGet(params) {
  return request(`/company/company-setting/page`);
}

export async function appImgSet(params) {
  return request(`/company/company-setting/page`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function selectAccountLogin(params) {
  return request(`/user/auth/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function fakeAccountLogin(params) {
  return request('/user/auth', {
    method: 'POST',
    body: params,
  });
}

export async function wxAccountLogin(params) {
  return request('/wework/oauth/login', {
    method: 'POST',
    body: params,
  });
}

export async function ddAccountLogin(params) {
  return request('/dingtalk/oauth/login', {
    method: 'POST',
    body: params,
  });
}

export async function personalizeLogin(params) {
  return request('/company/template-image/template', {
    method: 'POST',
    body: params,
  });
}

export async function fakeAccountLogout(params) {
  return request(`/communal/user/auth/${params.id}`, {
    method: 'DELETE',
    body: params,
  });
}

export async function queryRole(params) {
  return request(`/auth/role?${stringify(params)}`);
}

export async function queryUserRole() {
  return request('/user/auth/role');
}

export async function getRoleAuth(params) {
  return request(`/auth/role/${params}`);
}

export async function editRoleAuth(params) {
  return request(`/auth/role/${params.id}`,{
    method: 'PUT',
    body: params,
  });
}

export async function removeRole(params) {
  return request(`/auth/role/${params}`, {
    method: 'DELETE',
  });
}

export async function addRole(params) {
  return request('/auth/role', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryAuthTree(params) {
  return request(`/auth/permission/tree?${stringify(params)}`);
}

export async function smsFetch(params) {
  return request(`/company/account/sms?${stringify(params)}`);
}

export async function activeSms(params) {
  return request('/company/account/sms', {
    method: 'POST',
    body: params,
  });
}

export async function setSmsFetch(params) {
  return request(`/user/company/config?${stringify(params)}`);
}

export async function uploadPic(params) {
  return request('/user/image', {
    method: 'POST',
    body: params,
  });
}

export async function setSmsConfig(params) {
  return request(`/user/company/config?${stringify(params)}`, {
    method: 'PUT',
    body: [params],
  }
);
}

export async function postTree(params) {
  return request(`/company/post/tree?${stringify(params)}`);
}

export async function postAppendTree(params) {
  return request(`/company/post/tree/${params.parent_id}?type=${params.type}`);
}

export async function departmentTree(params) {
  return request(`/company/department/tree?${stringify(params)}`);
}

export async function departmentAppendTree(params) {
  return request(`/company/department/tree/${params.parent_id}?type=${params.type}`);
}

export async function tagsTree(params) {
  return request(`/company/label/tree?${stringify(params)}`);
}

export async function tagsAppendTree(params) {
  return request(`/company/label/account/${params}`);
}

export async function keyword(params) {
  return request(`/company/account/keyword?${stringify(params)}`);
}

export async function searchAccount(params) {
  return request(`/company/account?${stringify(params)}`);
}

export async function config(params) {
  return request(`/common/index/config?${stringify(params)}`);
}

export async function systemDate() {
  return request(`/common/index/time`);
}

export async function lnowledgeTree() {
  return request(`/company/knowledge-class/tree`);
}

export async function addLnowledgeTree(params) {
  return request('/company/knowledge-class', {
    method: 'POST',
    body: params,
  });
}

export async function editLnowledgeTree(params) {
  return request(`/company/knowledge-class/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function removeLnowledgeTree(params) {
  return request(`/company/knowledge-class/${params}`,{
    method: 'DELETE',
  });
}

export async function queryResource(params) {
  return request(`/company/knowledge-class/resource?${stringify(params)}`);
}

export async function searchResource(params) {
  return request(`/company/knowledge-class?${stringify(params)}`);
}

export async function editResourceKnowledge(params) {
  return request(`/company/knowledge-class/resource-update`, {
    method: 'PUT',
    body: params,
  });
}

export async function queryCourseAllot(params) {
  return request(`/company/course-allot?${stringify(params)}`);
}

export async function delCourseAllot(params) {
  return request(`/company/course-allot/empty`, {
    method: 'PUT',
    body: params,
  });
}

export async function addCourseAllot(params) {
  return request(`/company/course-allot`, {
    method: 'POST',
    body: params,
  });
}

export async function editCourseAllot(params) {
  return request(`/company/course-allot`, {
    method: 'PUT',
    body: params,
  });
}

export async function queryDocument(params) {
  return request(`/company/document?${stringify(params)}`);
}

export async function auditDocument(params) {
  return request(`/company/document/my-list?${stringify(params)}`);
}

export async function removeDocument(params) {
  return request('/company/document', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

export async function addDocument(params) {
  return request(`/company/document`,{
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function editDocument(params) {
  return request(`/company/document/${params.id}`,{
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function searchDocument(params) {
  return request(`/company/document/keyword?${stringify(params)}`);
}

export async function getDocument(params) {
  return request(`/company/document/${params}`);
}

export async function previewDocument(params) {
  return request(`/company/document/preview/${params}`);
}

export async function readDocument(params) {
  return request(`/company/doc-server/read?documentId=${params}`);
}

export async function resourcekeyword(params) {
  return request(`/company/resource/keyword?currentPage=${params.currentPage || 1}`, {
    method: 'POST',
    body: params,
  });
}

/***********************OLD*************************** */

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryCity() {
  return request('/api/city');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}


export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params) {
  return request(`/company/message?${stringify(params)}`);
}
export async function readNotices(params) {
  return request(`/company/message/${params.id}`, {
    method: 'PUT'
  })
}
export async function getNoticesPage(params) {
  return request('/company/message/page', {
    method: 'POST',
    body: params,
  })
}
/*****课程中心接口 ******/
export async function getCourseClass(params) {
  return request(`/manager/course/official-course/class`)
}
export async function getCourseList(params) {
  return request(`/manager/course/official-course?${stringify(params)}`)
}

export async function getCourseDetails(params) {
  return request(`/manager/course/official-course/${params}`)
}

export async function getShoppingData(params) {
  return request(`/manager/course/shopping-cart?${stringify(params)}`)
}

export async function joinShopping(params) {
  return request(`/manager/course/shopping-cart`, {
    method: 'POST',
    body: params,
  })
}

export async function deleteShopping(params) {
  return request(`/manager/course/shopping-cart/empty`, {
    method: 'PUT',
    body: params,
  })
}

export async function emptyShopping() {
  return request(`/manager/course/shopping-cart/empty`, {
    method: 'PUT',
  })
}

export async function invitationTeacher(params) {
  return request(`/course/teacher/invitation`, {
    method: 'POST',
    body: params,
  })
}

export async function shoppingPurchase(params) {
  return request(`/manager/course/shopping-cart/shopping`, {
    method: 'POST',
    body: params,
  })
}

export async function shoppingKnowledge(id, params) {
  return request(`/manager/course/shopping-cart/${id}`, {
    method: 'PUT',
    body: params,
  })
}

export async function courseExport(params) {
  return request(`/manager/course/official-course/excel?${stringify(params)}`);
}

export async function getShareLink(params) {
  return request(`/manager/course/official-course/share`, {
    method: 'POST',
    body: params,
  })
}

/*****考试接口 ******/
export async function examPaperList(params) {
  return request(`/exam/paper?${stringify(params)}`);
}

export async function examPaperDelete(params) {
  return request(`/exam/paper/empty`, {
    method: 'PUT',
    body: params,
  })
}

export async function examPaperKeyword(params) {
  return request(`/exam/paper/keyword?${stringify(params)}`)
}

export async function examPaperModuleAdd(params) {
  return request(`/exam/paper-module`, {
    method: 'POST',
    body: params,
  })
}

export async function examPaperModuleUpdate(id, params) {
  return request(`/exam/paper-module/${id}`, {
    method: 'PUT',
    body: params,
  })
}
// 获取试卷第一步骤数据
export async function examPaperStepData(id) {
  return request(`/exam/paper/${id}`)
}

// 获取选题模块数据
export async function examPaperModuleData(params) {
  return request(`/exam/paper/module-question?${stringify(params)}`)
}

// 删除题型
export async function examPaperModuleDetele(params) {
  return request(`/exam/paper-module/empty`, {
    method: 'PUT',
    body: params,
  })
}
// 题型排序接口
export async function examPaperModuleSort(params) {
  return request(`/exam/paper-module/sort`, {
    method: 'PUT',
    body: params,
  })
}
// 获得题型
export async function examQuestionAddModule(params) {
  return request(`/exam/module-question`, {
    method: 'POST',
    body: params,
  })
}

// 试题排序接口
export async function examQuestionModuleSort(id, params) {
  return request(`/exam/module-question/${id}`, {
    method: 'PUT',
    body: params,
  })
}
// 删除试题
export async function examQuestionDeleteModule(params) {
  return request(`/exam/module-question/${params}`, {
    method: 'DELETE'
  })
}

// 获取抽题数据
export async function examQuestionRand(params) {
  return request(`/exam/paper/rand-scope?${stringify(params)}`)
}
// 保存抽题数据
export async function examQuestionRandSave(params) {
  return request(`/exam/paper/rand-question`, {
    method: 'POST',
    body: params,
  })
}

// 添加抽题范围
export async function examQuestionAddRand(params) {
  return request(`/exam/paper-rand-scope`, {
    method: 'POST',
    body: params,
  })
}
// 删除抽题范围
export async function examQuestionDeleteRand(params) {
  return request(`/exam/paper-rand-scope/empty`, {
    method: 'PUT',
    body: params,
  })
}

export async function examPaperAddStep1(params) {
  return request(`/exam/paper`, {
    method: 'POST',
    body: params,
  })
}

// 试卷第一步骤编辑保存
export async function examPaperUpdateStep1(id, params) {
  return request(`/exam/paper/${id}`, {
    method: 'PUT',
    body: params,
  })
}

export async function examaddQuestion(params) {
  return request(`/exam/question`, {
    method: 'POST',
    body: params,
  })
}
// 企业试题库列表请求
export async function examQuestionList(params) {
  return request(`/exam/question?${stringify(params)}`)
}

// 先之课程题库
export async function examZhiQuestionList(params) {
  return request(`/exam/question/course?${stringify(params)}`)
}

export async function examQuestionDelete(params) {
  return request(`/exam/question/empty`, {
    method: 'PUT',
    body: params,
  })
}

export async function examQuestionUpdate(params) {
  return request(`/exam/question/${params}`)
}

export async function examQuestionUpdateSave(id, params) {
  return request(`/exam/question/${id}`, {
    method: 'PUT',
    body: params,
  })
}

export async function examQuestionKeyword(params) {
  return request(`/exam/question/keyword?${stringify(params)}`)
}
// 必修课接口
export async function queryCompulsory(params) {
  return request(`/course/compulsory-optional?${stringify(params)}`);
}

export async function updateCompulsory(params) {
  return request(`/course/compulsory-optional`, {
    method: 'POST',
    body: params,
  })
}

// 自制课程封面
export async function getSelfCoursePic(params) {
  return request(`/course/company-course/image?${stringify(params)}`)
}

//自制课程接口
export async function selfCourseList(params) {
  return request(`/course/company-course?${stringify(params)}`)
}
// 自制课程联想
export async function selfCourseKeyword(params) {
  return request(`/course/company-course/keyword?${stringify(params)}`)
}

// 删除自制课程
export async function selfCourseDelete(params) {
  if (params.type === 1) {
    return request(`/course/company-course/${params.id}`, {
      method: 'DELETE'
    })
  }
  return request(`/course/company-course`, {
    method: 'DELETE',
    body: params.id,
  })
}
// 自制课程添加
export async function selfCourseAdd(params) {
  return request(`/course/company-course`, {
    method: 'POST',
    body: params,
  })
}
// 自制课程编辑
export async function selfCourseUpdate(id, params) {
  return request(`/course/company-course/${id}`, {
    method: 'PUT',
    body: params,
  })
}
//自制课程导出
export async function selfCourseExport(params) {
  return request(`/course/company-course/export?${stringify(params)}`)
}
// 自制课程题目删除
export async function selfCourseModuleDelete(id, params) {
  return request(`/course/company-course/question/${id}`, {
    method: 'DELETE',
    body: params,
  })
}
// 自制课程题目添加
export async function selfCourseModuleAdd(id, params) {
  return request(`/course/company-course/question/${id}`, {
    method: 'POST',
    body: params,
  })
}
//未通过的自制列表
export async function selfCourseUnPass(params) {
  return request(`/course/company-course/my-list?${stringify(params)}`)
}
// 自制课程详情数据
export async function selfCourseDetails(params) {
  return request(`/course/company-course/${params}`)
}
// 自制课程课后考试
export async function selfCourseExam(id, params) {
  return request(`/course/company-course/exam/${id}`, {
    method: 'PUT',
    body: params,
  })
}
// 自制添加章节
export async function selfCourseLectureAdd(id, params) {
  return request(`/course/lecture/add/${id}`, {
    method: 'POST',
    body: params,
  })
}
// 自制删除章节
export async function selfCourseLectureDelete(id, params) {
  return request(`/course/lecture/${id}`, {
    method: 'DELETE',
    body: params,
  })
}
// 自制章节修改
export async function selfCourseLectureUpdate(id, params) {
  return request(`/course/lecture/${id}`, {
    method: 'PUT',
    body: params,
  })
}
// 自制章节移动
export async function selfCourseLectureMove(id, params) {
  return request(`/course/lecture/swap/${id}`, {
    method: 'PUT',
    body: params,
  })
}
// 自制课程完成
export async function selfCourseLectureSave(id) {
  return request(`/course/company-course/finish/${id}`, {
    method: 'PUT',
  })
}

// 自制课程预览
export async function selfCoursePreview(params) {
  return request(`/course/company-course/preview/${params}`)
}

/*****线下活动 ******/
// 活动列表
export async function offlineList(params) {
  return request(`/activity/main?${stringify(params)}`)
}
// 活动数量统计
export async function offlineCount() {
  return request(`/activity/main/count`)
}
// 活动删除
export async function offlineDelete(type, params) {
  return request(`/activity/main/empty?${stringify(type)}`, {
    method: 'PUT',
    body: params
  })
}
// 活动人员删除
export async function offlineMemberDel(id) {
  return request(`/activity/student/${id}`, {
    method: 'DELETE'
  })
}
// 活动详情
export async function offlineDetails(params) {
  return request(`/activity/main/${params}`)
}
// 活动添加
export async function offlineAdd(params) {
  return request(`/activity/main`, {
    method: 'POST',
    body: params,
  })
}
// 活动编辑
export async function offlineUpdate(id, params) {
  return request(`/activity/main/${id}`, {
    method: 'PUT',
    body: params,
  })
}
//活动统计
export async function offlineStudentCount(params) {
  return request(`/activity/student?${stringify(params)}`)
}
// 手动签到
export async function offlineStudentLogin(params) {
  return request(`/activity/main/login`, {
    method: 'PUT',
    body: params
  })
}
// 已移除的人员列表
export async function offlineStudentRemove(params) {
  return request(`/activity/student/clear-data?${stringify(params)}`)
}
// 添加计划/线下分类
export async function addClassType(params) {
  return request(`/company/classes`, {
    method: 'POST',
    body: params,
  })
}
// 分类列表
export async function getClassList(params) {
  return request(`/company/classes?${stringify(params)}`)
}
// 分类删除
export async function deleteClassType(params) {
  return request(`/company/classes/${params}`, {
    method: 'DELETE',
  })
}
/***证书管理 */

//证书颁布记录
export async function getUserCertificationList(params) {
  return request(`/company/user-certification?${stringify(params)}`)
}
// 证书列表分页
export async function getCertificationList(params) {
  return request(`/company/certification?${stringify(params)}`)
}
// 证书列表总分页
export async function getAllCertificationList(params) {
  return request(`/company/certification/list?${stringify(params)}`)
}
// 证书删除
export async function deleteCertification(params) {
  return request(`/company/certification/${params}`, {
    method: 'DELETE'
  })
}
// 获得证书模板
export async function getCertificationTemplate(params) {
  return request(`/company/certification/template?${stringify(params)}`)
}
// 获得证书列表
export async function getCertList(params) {
  return request(`/company/certification/list`)
}
// 手动颁发证书
export async function giveUserCertification(params) {
  return request(`/company/user-certification`, {
    method: 'POST',
    body: params
  })
}
// 新增证书
export async function addCertification(params) {
  return request(`/company/certification`, {
    method: 'POST',
    body: params
  })
}
// 编辑证书
export async function upDateCertification(id, params) {
  return request(`/company/certification/${id}`, {
    method: 'PUT',
    body: params
  })
}
// 获得证书信息
export async function getCertificateDetails(params) {
  return request(`/company/certification/${params}`)
}
// 计划详情预览
export async function getPlanPreviewDetails(params) {
  return request(`/plan/index/preview/${params}`)
}
// 岗位计划详情预览
export async function getPostPlanPreviewDetails(params) {
  return request(`/plan/post-plan/${params}`)
}
// 计划人员列表
export async function getPlanPeopleList(params) {
  return request(`/plan/student/list?${stringify(params)}`)
}
// 岗位计划人员列表
export async function getPostPlanPeopleList(params) {
  return request(`/plan/post-plan/student?${stringify(params)}`)
}
// 学员学习记录
export async function getPlanPeopleRecordList(params) {
  return request(`/plan/record?${stringify(params)}`)
}
// 人员学习信息
export async function getPlanPeopleStudyList(params) {
  return request(`/plan/student/info?${stringify(params)}`)
}
// 计划失败人员列表
export async function getPlanFailPeopleList(params) {
  return request(`/plan/student/fail?${stringify(params)}`)
}
// 一键发布计划失败人员
export async function saveFailPeople(id, params) {
  return request(`/plan/index/release/${id}`, {
    method: 'PUT',
    body: params
  })
}
// 计划课程列表

// 计划活动列表
export async function getPlanActivityList(params) {
  return request(`/plan/resource/activity?${stringify(params)}`)
}
// 计划考试列表
export async function getPlanExamList(params, type) {
  return request(`/plan/${ type || 'resource'}/exam?${stringify(params)}`)
}
// 计划文库列表
export async function getPlanDocumentList(params, type) {
  return request(`/plan/${ type || 'resource'}/document?${stringify(params)}`)
}


/*****计划管理start ******/
//计划封面图片列表
export async function planGetPic(params) {
  return request(`/plan/index/image/${params.plan_id}`)
}
//计划标题验证
export async function planCheckTitle(params) {
  return request(`/plan/index/check-title`,{
    method: 'POST',
    body: params,
  })
}
//计划列表
export async function queryPlanList(params) {
  return request(`/plan/index?${stringify(params)}`,{
  })
}
//计划数量
export async function queryPlanNum() {
  return request(`/plan/index/info`,{
  })
}
//计划类型
export async function queryPlanType(params) {
  return request(`/company/classes?${stringify(params)}`,{
  })
}
export async function addPlanType(params) {
  return request(`/company/classes`,{
    method: 'POST',
    body: params,
  })
}
export async function delPlanType(params) {
  return request(`/company/classes/${params.class_id}`,{
    method: 'DELETE'
  })
}
//新增计划
export async function planInfo(params) {
  return request(`/plan/index`,{
    method: 'POST',
    body: params,
  })
}
//计划列表
export async function delPlan(params) {
  return request(`/plan/index/${params.plan_id}`,{
    method: 'DELETE',
    body: params,
  })
}
export async function planAddModal(params) {
  return request(`/plan/module`,{
    method: 'POST',
    body: params,
  })
}
export async function planDelModal(params) {
  return request(`/plan/module?${stringify(params)}`,{
    method: 'DELETE',
    body: params,
  })
}
export async function planEditModal(params) {
  return request(`/plan/module/${params.module_id}`,{
    method: 'PUT',
    body: params,
  })
}
export async function planGetModal(params, item, type) {
  return request(`/plan/${ type || 'resource' }/course-module/${params.plan_id}?${stringify(item)}`)
}
//获取计划信息
export async function planGetInfo(params) {
  return request(`/plan/index/${params.plan_id}`)
}
export async function planEditInfo(params) {
  return request(`/plan/index/${params.plan_id}`,{
    method: 'PUT',
    body: params,
  })
}
export async function planGetTotalMember(params) {
  return request(`/plan/student/existence?${stringify(params)}`,{
  })
}
export async function planGetMember(params) {
  return request(`/plan/student?${stringify(params)}`,{
  })
}
export async function planEditMember(params) {
  return request(`/plan/student/${params.plan_id}`,{
    method: 'PUT',
    body: params,
  })
}
//第四部
export async function planSet(params) {
  return request(`/plan/index/setting/${params.plan_id}`,{
    method: 'PUT',
    body: params,
  })
}
//finish
export async function planFinish(params) {
  return request(`/plan/index/finish/${params.plan_id}`,{
  })
}
//计划添加资源
export async function planSetSource(params) {
  return request(`/plan/resource/${params.plan_id}`,{
    method: 'PUT',
    body: params,
  })
}

//计划单个模块课程
export async function planGetCourse(params, type) {
  return request(`/plan/${ type || 'resource'}/course?${stringify(params)}`)
}
// 岗位计划详情预览
export async function getTemplateDetail(params) {
  return request(`/plan/post-plan/template/${params.template_id}`)
}
//课程排序
export async function planSwapSource(params) {
  return request(`/plan/resource/course-swap/${params.plan_id}`,{
    method: 'PUT',
    body: params,
  })
}
//课程是否顺序学习
export async function planOrderCourse(params) {
  return request(`/plan/resource/course-order/${params.plan_id}`,{
    method: 'PUT',
    body: params,
  })
}
//计划活动列表
export async function planGetActivity(params) {
  return request(`/plan/resource/activity?${stringify(params)}`)
}
//添加计划考试
export async function planAddExam(params) {
  return request(`/exam/exam-manager/plan-exam`,{
    method: 'POST',
    body: params,
  })
}
//添加岗位考试
export async function planAddPostExam(params) {
  return request(`/exam/exam-manager/post-exam`,{
    method: 'POST',
    body: params,
  })
}
//计划考试列表
export async function planGetExam(params) {
  return request(`/plan/resource/exam?${stringify(params)}`)
}
//计划文库列表
export async function planGetDocument(params) {
  return request(`/plan/resource/document?${stringify(params)}`)
}
//计划校验时间
export async function planCheckDate(params) {
  return request(`/plan/index/check-time/${params.plan_id}`,{
    method: 'POST',
    body: params,
  })
}
//岗位计划未购课程列表
export async function planNoBuyCourse(params) {
  return request(`/plan/post-plan/buy?${stringify(params)}`)
}
/*****计划管理end ******/

/*****个性化start ******/
export async function companyDomain(params) {
  return request(`/company/contract/domain`)
}
export async function companyPhone(params) {
  return request(`/company/contract/service`)
}
export async function companySetTemplate(params) {
  return request(`/company/main/template`,{
    method: 'PUT',
    body: params,
  })
}
export async function companyTemplateList(params) {
  return request(`/company/main/template-list`)
}
export async function companyGetTemplate(params) {
  return request(`/company/main/template`)
}
export async function companyDelImg(params) {
  return request(`/company/template-image/${params.id}`,{
    method: 'DELETE'
  })
}
export async function companyAddImg(params) {
  return request(`/company/template-image`,{
    method: 'POST',
    body: params,
  })
}
export async function companySetHome(params) {
  return request(`/company/department/store-image`,{
    method: 'PUT',
    body: params,
  })
}
export async function companyGetContract(params) {
  return request(`/company/contract/message`)
}
/*****个性化end ******/

/*****公告管理start ******/
export async function companyGetNotice(params) {
  return request(`/company/announcement?${stringify(params)}`)
}
export async function companyAddNotice(params) {
  return request(`/company/announcement`,{
    method: 'POST',
    body: params,
  })
}
export async function companyEditNotice(params) {
  return request(`/company/announcement/${params.id}`,{
    method: 'PUT',
    body: params,
  })
}
export async function companyDelNotice(params) {
  return request(`/company/announcement/${params.id}`,{
    method: 'DELETE'
  })
}
/*****公告管理end ******/

/*****数据统计start ******/
export async function planDetail(params) {
  return request(`/manager/learning/plan?${stringify(params)}`)
}
export async function planExportDetail(params) {
  return request(`/manager/learning/plan/export?${stringify(params)}`)
}
export async function courseDetail(params) {
  return request(`/manager/learning/course?${stringify(params)}`)
}
export async function courseExportDetail(params) {
  return request(`/manager/learning/course/export?${stringify(params)}`)
}
export async function examDetail(params) {
  return request(`/manager/learning/exam?${stringify(params)}`)
}
export async function examExportDetail(params) {
  return request(`/manager/learning/exam/excel?${stringify(params)}`)
}
export async function creditDetail(params) {
  return request(`/manager/learning/credit?${stringify(params)}`)
}
export async function getStudentMain(params) {
  return request(`/manager/student/main?${stringify(params)}`)
}
export async function  getStudentExcel(params) {
  return request(`/manager/student/main/excel?${stringify(params)}`);
}
export async function creditExportDetail(params) {
  return request(`/manager/learning/credit/excel?${stringify(params)}`)
}
export async function durationDetail(params) {
  return request(`/manager/learning/duration?${stringify(params)}`)
}
export async function durationExportDetail(params) {
  return request(`/manager/learning/duration/export?${stringify(params)}`)
}
/*****数据统计end ******/

/*****学习资源start ******/
export async function resourceXianZhi(params) {
  return request(`/manager/resource/course?${stringify(params)}`)
}
export async function resourceSelf(params) {
  return request(`/manager/resource/company-course?${stringify(params)}`)
}
export async function resourceLibrary(params) {
  return request(`/manager/resource/document?${stringify(params)}`)
}
export async function resourceExcelXianZhi(params) {
  return request(`/manager/resource/course/excel?${stringify(params)}`)
}
export async function resourceExcelSelf(params) {
  return request(`/manager/resource/company-course/excel?${stringify(params)}`)
}
export async function resourceExcelLibrary(params) {
  return request(`/manager/resource/document/excel?${stringify(params)}`)
}
/*****学习资源end ******/

/*****首页start ******/
export async function home(params) {
  return request(`/manager/index?${stringify(params)}`)
}
export async function homeChart(params) {
  return request(`/manager/index/data?${stringify(params)}`)
}

/*****首页end ******/

/*****钉钉start  ******/
export async function dingtalkInfo() {
  return request(`/dingtalk/index/info`)
}
export async function dingtalkBind(params) {
  return request(`/dingtalk/index`,{
    method: 'POST',
    body: params,
  })
}
export async function dingtalkSync(params) {
  return request(`/dingtalk/index/main/${params.id}`)
}
export async function dingtalkBindUpdata(params) {
  return request(`/dingtalk/index/${params.id}`,{
    method: 'PUT',
    body: params,
  })
}
export async function dingtalkUntying(params) {
  return request(`/dingtalk/index/bind/${params.id}`,{
    method: 'PUT',
    body: params,
  })
}

/*****钉钉end ******/

/*****部门统计start ******/
export async function getStudyCountlist(params) {
  return request(`/manager/department/plan?${stringify(params)}`)
}
export async function getStudyCountChart(params) {
  return request(`/manager/department/plan/chart?${stringify(params)}`)
}
export async function getStudyCountExport(params) {
  return request(`/manager/department/plan/excel?${stringify(params)}`)
}

export async function getCourseCountlist(params) {
  return request(`/manager/department/course?${stringify(params)}`)
}
export async function getCourseCountChart(params) {
  return request(`/manager/department/course/chart?${stringify(params)}`)
}
export async function getCourseCountExport(params) {
  return request(`/manager/department/course/excel?${stringify(params)}`)
}

export async function getResourceCountlist(params) {
  return request(`/manager/department/resource?${stringify(params)}`)
}
export async function getResourceCountExport(params) {
  return request(`/manager/department/resource/excel?${stringify(params)}`)
}

export async function getLivenessCountlist(params) {
  return request(`/manager/department/liveness?${stringify(params)}`)
}
export async function getLivenessCountChart(params) {
  return request(`/manager/department/liveness/chart?${stringify(params)}`)
}
export async function getLivenessCountExport(params) {
  return request(`/manager/department/liveness/excel?${stringify(params)}`)
}

export async function getDurationCountlist(params) {
  return request(`/manager/department/duration?${stringify(params)}`)
}
export async function getDurationCountChart(params) {
  return request(`/manager/department/duration/chart?${stringify(params)}`)
}
export async function getDurationCountExport(params) {
  return request(`/manager/department/duration/excel?${stringify(params)}`)
}

export async function getExamCountlist(params) {
  return request(`/manager/department/exam?${stringify(params)}`)
}
export async function getExamCountChart(params) {
  return request(`/manager/department/exam/chart?${stringify(params)}`)
}
export async function getExamCountExport(params) {
  return request(`/manager/department/exam/excel?${stringify(params)}`)
}

export async function getActivityCountlist(params) {
  return request(`/manager/department/activity?${stringify(params)}`)
}
export async function getActivityCountChart(params) {
  return request(`/manager/department/activity/chart?${stringify(params)}`)
}
export async function getActivityCountExport(params) {
  return request(`/manager/department/activity/excel?${stringify(params)}`)
}

export async function getCreditCountlist(params) {
  return request(`/manager/department/credit?${stringify(params)}`)
}
export async function getCreditCountChart(params) {
  return request(`/manager/department/credit/chart?${stringify(params)}`)
}
export async function getCreditCountExport(params) {
  return request(`/manager/department/credit/excel?${stringify(params)}`)
}
/*****部门统计end ******/
/**岗位胜任力strat */

export async function editClassType(params) {
  return request(`/company/classes/${params.id}`,{
    method: 'PUT',
    body: params,
  })
}

export async function getCompetencyTree(params) {
  return request(`/company/post-competency/tree?${stringify(params)}`)
}

export async function addCompetencySequence(params) {
  return request(`/company/post-competency`,{
    method: 'POST',
    body: params,
  })
}

export async function editCompetencySequence(params) {
  return request(`/company/post-competency/${params.id}`,{
    method: 'PUT',
    body: params,
  })
}

export async function getCompetencyTreeSearch(params) {
  return request(`/company/post-competency-child?${stringify(params)}`)
}

export async function getCompetencyTelTreeSearch(params) {
  return request(`/company/post-competency-child/template?${stringify(params)}`)
}

export async function addCompetencyPost(params) {
  return request(`/company/post-competency-child`,{
    method: 'POST',
    body: params,
  })
}

export async function changeCompetencySort(params) {
  return request(`/company/post-competency/sort`,{
    method: 'POST',
    body: params,
  })
}

export async function editCompetencyPost(params) {
  return request(`/company/post-competency-child/${params.id}`,{
    method: 'PUT',
    body: params,
  })
}


export async function deleteCompetencyPost(params) {
  return request(`/company/post-competency-child/${params.id}`,{
    method: 'DELETE'
  })
}

export async function deleteCompetencySequence(params) {
  return request(`/company/post-competency/${params.id}`,{
    method: 'DELETE'
  })
}

export async function getPostPlanList(params) {
  return request(`/plan/post-plan?${stringify(params)}`)
}

export async function getPostPlanTelList(params) {
  return request(`/plan/post-plan/templates?${stringify(params)}`)
}

export async function deletePostPlan(params) {
  return request(`/plan/post-plan`,{
    method: 'DELETE',
    body: params
  })
}

export async function copyPostPlan(params) {
  return request(`/plan/post-plan/copy/${params.id}`)
}

export async function changePostPlanStatus(params) {
  return request(`/plan/post-plan/up-down/${params.id}`)
}

export async function getPostPlanStudent(params) {
  return request(`/plan/post-plan/student?${stringify(params)}`)
}

export async function getPostPlanTelNum(params) {
  return request(`/plan/post-plan/course-template?${stringify(params)}`)
}

export async function studentExport(params) {
  return request(`/plan/post-plan/student-export?${stringify(params)}`)
}

/*****岗位胜任力end ******/