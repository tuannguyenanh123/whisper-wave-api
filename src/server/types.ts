import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Member } from "src/member/member.type";
import { Profile } from "src/profile/profile.type";


@ObjectType()
export class Channel {
    @Field()
    id: number;

    @Field({nullable: true})
    name: string;

    @Field(() => ChannelType)
    type: ChannelType;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
    
    @Field(() => [Member],{nullable: true})
    messages: Member[];
}

export enum ChannelType {
    TEXT="TEXT",
    VIDEO="VIDEO",
    AUDIO="AUDIO",
}

registerEnumType(ChannelType, {
    name: "ChannelType",
    description: "define type of channel",
})

@ObjectType()
export class Server {
    @Field()
    id: number;

    @Field({nullable: true})
    name: string;

    @Field()
    imageUrl: string;
    
    @Field({nullable: true})
    inviteCode: string;

    @Field()
    profileId: number;

    @Field(() => Profile, {nullable: true})
    profile: Profile;

    @Field(() => [Member],{nullable: "itemsAndList"})
    members: Member[];

    @Field(() => [Channel], {nullable: "itemsAndList"})
    channels: Channel[];
}