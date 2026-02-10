export default function CreateName(name) {
    return `${name?.firstName} ${name?.middleName ? name?.middleName + " " + name?.lastName : name?.lastName}`;
}