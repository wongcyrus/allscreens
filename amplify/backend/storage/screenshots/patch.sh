read -d '' patchedTeacherPolicy << EOF
                                "-teachersGroupRole"
                            ]
                        ]
                    }
                ],
                "PolicyDocument": {
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Action": [
                                "s3:PutObject",
                                "s3:GetObject",
                                "s3:DeleteObject"
                            ],
                            "Resource": [
                                {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "arn:aws:s3:::",
                                            {
                                                "Ref": "S3Bucket"
                                            },
                                            "/*"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "Effect": "Allow",
                            "Action": [
                                "s3:ListBucket"
                            ],
                            "Resource": [
                                {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "arn:aws:s3:::",
                                            {
                                                "Ref": "S3Bucket"
                                            }
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        },
EOF

read -d '' orginalTeacherPolicy << EOF
                                "-teachersGroupRole"
                            ]
                        ]
                    }
                ],
                "PolicyDocument": {
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Action": [
                                "s3:PutObject",
                                "s3:GetObject",
                                "s3:ListBucket",
                                "s3:DeleteObject"
                            ],
                            "Resource": [
                                {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "arn:aws:s3:::",
                                            {
                                                "Ref": "S3Bucket"
                                            },
                                            "/*"
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        },
EOF

sed 's/$orginalTeacherPolicy/$patchedTeacherPolicy/g' s3-cloudformation-template.json