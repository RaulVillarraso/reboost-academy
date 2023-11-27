import api from './index.js'


export const updateClassroom = async (id,classroomData) => {
  const data = await api.put(`/classroom/${id}`,classroomData)
  console.log(classroomData,id)
  return data
}