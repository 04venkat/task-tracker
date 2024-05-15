import Swal from "sweetalert2";


export const responseMessage = (icons: any, messageTitle: string, showConfirmStatus: boolean) => {

    Swal.fire({
        icon: icons,
        title: messageTitle,
        showConfirmButton: showConfirmStatus,
    });
};

interface TableItems {
    label: string;
}
export const tableColumnNames: TableItems[] = [
    {
        label: 'S.no'
    }, {
        label: 'Task name'
    },
    {
        label: "Description"
    },
    {
        label: 'Deadline'
    },
    {
        label: 'Status'
    }
];

// export interface UserRegisterData {
//     username: string | null | undefined;
//     email: string | null | undefined;
//     password: string | null | undefined;
//     profile_picture: FileList | null | undefined;
// }


export const imagePath = '../../assets/images/';

export interface Tasks {
    id: number;
    title: string;
    description: string;
    status_id: number;
    category_id: number;
    priority_id: number;
    deadline: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    trimmed_description: string;
    role_id: number;
    priority: {
        id: null;
        priority_level: string;
    };

    category: {
        id: number;
        category_type: string;
    }
    status: {
        id: number;
        status_name: string;
    };
    user: {
        id: number;
        full_name: string;
        profile_picture: string;
    };
    task_files: any;

};

export interface Categories {
    id: number;
    category_type: string;
    created_at: string;
    updated_at: string;
};

export interface Priority {
    id: number;
    priority_level: string;
    created_at: string;
    updated_at: string;
};

export interface TaskCount {
    totalTasks: number;
    groupByPriority: {
        priority_level: {
            High: number;
            Medium: number;
            Low: number;
        }
    };
    groupByStatus: {
        [status_name: string]: number;
    };
    groupByCategory: {
        [category_type: string]: number;
    };
}
export interface Status {
    [status_name: string]: number;
};
export interface Category {
    [category_type: string]: number;
};

export interface CountByPriority {
    [priority_level: string]: number;

}