import axiosPublic from '../lib/axios'
export async function getNotes(sessionId:string,noteId:string):Promise<any>{
     const response= await axiosPublic.get(`/api/getNote/${encodeURIComponent(sessionId)}?noteId=${encodeURIComponent(noteId)}`)
     return response 
}

export async function getAllNotes():Promise<any>{
     const response= await axiosPublic.get(`/api/getNotes`)
     return response.data 
}

export async function getNote(noteId:string):Promise<any>{
     const response= await axiosPublic.get(`/api/getNote/${encodeURIComponent(noteId)}`)
     return response.data 
}
