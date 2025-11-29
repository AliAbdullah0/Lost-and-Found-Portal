"use server"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ItemInput {
    name:string,
    description:string,
    image?:string,
    time?:Date,
    location:string,
    contactNo?:number,
}

interface StudentInput {
    email:string,
    enrollment:string
}

export const createStudent = async ({email,enrollment}:StudentInput) => {
    try {
        const student = await prisma.student.findUnique({
            where:{
                email,
                enrollment
            }
        })
        if(student) {
            const cookie = await cookies()
            cookie.set("student",student.id)
            return {
                success:true,
                message:"Logged in successfully !"
            }
        }
        const newStudent = await prisma.student.create({
            data:{
                email,
                enrollment
            }
        })
        const cookie = await cookies()
        cookie.set("student",newStudent.id)
        return {
            success:true,
            message:"Student created successfully"
        }
    } catch (error) {
        return {
            success:false,
            message:`Something went wrong while Creating Student ! 
             ${error}
            `
        }
    }
};

export const getCurrentStudentId = async ()=>{
    const cookie = await cookies()
    const id = await cookie.get("student")?.value
    return id
}

export const logOut = async ()=>{
    const cookie = await cookies()
    await cookie.delete("student")
}

export const getCurrentStudent = async ()=>{
    try {
        const cookie = await cookies()
        const studentID = await cookie.get("student")?.value
        const student = await prisma.student.findUnique({
            where:{
                id:studentID
            }
        })
        if(!student) {
        console.log("no student")
            return {
            success:false,
            message:"Student not found"
        }
    }
        return {
            success:true,
            student
        }
    } catch (error) {
        return {
            success:false,
            message:`Something went wrong while getting Student ! 
             ${error}
            `
        }   
    }
}

export const createLostItem = async ({name,description,image,contactNo,location,time}:ItemInput)=>{
    try {
        const studentId = await getCurrentStudentId();
        await prisma.lostItem.create({
            data:{
                name,
                description,
                image,
                contactNo,
                location,
                time,
                creatorId:studentId!,
            }
        })
        return {
            success:true,
            message:"Item created successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            message:`Something went wrong while Creating Item ! 
             ${error}
            `
        }
    }
};

export const getLostItems = async ()=>{
    try {
        const lostItems = await prisma.lostItem.findMany({
            include:{
                creator:true,
            }
        })
        return {
            success:true,
            lostItems
        }
    } catch (error) {
        return {
            success:false,
            message:`Something went wrong while getting Items ! 
             ${error}
            `
        }   
    }
};

export const createFoundedItem = async ({name,description,image,contactNo,location,time}:ItemInput)=>{
    try {
        const studentId = await getCurrentStudentId();
        await prisma.foundItem.create({
            data:{
                name,
                description,
                image,
                contactNo,
                location,
                time,
                creatorId:studentId!,
            }
        })
        return {
            success:true,
            message:"Item created successfully"
        }
    } catch (error) {
        return {
            success:false,
            message:`Something went wrong while Creating Item ! 
             ${error}
            `
        }
}
};

export const getFoundItems = async ()=>{
    try {
        const foundItems = await prisma.foundItem.findMany({
            include:{
                creator:true,
            }
        })
        return {
            success:true,
            foundItems
        }
    } catch (error) {
        return {
            success:false,
            message:`Something went wrong while getting Items ! 
             ${error}
            `
        }   
    }
}

export const deleteLostItem = async (id:string)=>{
    try {
        await prisma.lostItem.delete({
            where:{
                id
            }
        })
        return {
            success:true,
            message:"Item deleted successfully"
        }
    } catch (error) {
        return {
            success:false,
            message:`Something went wrong while deleting Item ! 
             ${error}
            `
        }   
    }
}

export const deleteFoundItem = async (id:string)=>{
    try {
        await prisma.foundItem.delete({
            where:{
                id
            }
        })
        return {
            success:true,
            message:"Item deleted successfully"
        }
    } catch (error) {
        return {
            success:false,
            message:`Something went wrong while deleting Item ! 
             ${error}
            `
        }   
    }
}