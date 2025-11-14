import axiosPublic from '../lib/axios'
interface notes{
     id:string,
     title:string,
     createdAt:string,
}

interface note{
     id:string,,
     title:string,
     content:string,
     createdAt:string,
}
export async function getNotes(sessionId:string,noteId:string):Promise<any>{
     const response= await axiosPublic.get(`/api/getNote/${encodeURIComponent(sessionId)}?noteId=${encodeURIComponent(noteId)}`)
     return response 
}

export async function getAllNotes():Promise<notes[]>{
     const response= await axiosPublic.get(`/api/getNotes`)
     return response.data as notes[]
}

export async function getNote(noteId:string):Promise<note>{
     const response= await axiosPublic.get(`/api/getNote/${encodeURIComponent(noteId)}`)
     return response.data as note
}
